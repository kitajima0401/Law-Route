"use client";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState, useRef } from "react";

type Props = {
  law_revision_id: string;
};

type LawResponse = {
  revision_info: {
    law_title: string;
    abbrev?: string;
    amendment_law_title?: string;
    amendment_enforcement_date?: string;
  };
  law_full_text: {
    children: any[];
  };
};

const LawDetails = ({ law_revision_id }: Props) => {
  const [LawData, setLawData] = useState<LawResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [openPart, setOpenPart] = useState<string | null>(null);
  const [openChapter, setOpenChapter] = useState<string | null>(null);

  const pendingPartToOpen = useRef<string | null>(null);

  const togglePart = (key: string) => {
    setOpenPart((prev) => (prev === key ? null : key));
  };

  const toggleChapter = (key: string) => {
    setOpenChapter((prev) => (prev === key ? null : key));
  };

  useEffect(() => {
    const getFullText = async () => {
      try {
        if (!law_revision_id) {
          setError("法令IDが指定されていません");
          setLoading(false);
          return;
        }

        const response = await fetch("/api/item/getFullText", {
          method: "POST",
          body: JSON.stringify({ law_revision_id }),
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error("サーバーエラー");
        const data = await response.json();
        setLawData(data);
        setLoading(false);
      } catch (err) {
        setError("法令データの読み込みに失敗しました");
        setLoading(false);
      }
    };
    getFullText();
  }, [law_revision_id]);

  if (loading) return <div>読み込み中...</div>;
  if (error) return <div>{error}</div>;
  if (!LawData) return null;

  const renderNode = (node: any, index?: number): React.ReactNode => {
    if (typeof node === "string") return node;

    const { tag, attr = {}, children = [] } = node;
    const num = attr.Num || "";
    const key = num || `${tag}-${index}`;

    if (tag === "TOC" || tag === "TableOfContents") {
      return (
        <Accordion key={`toc`} sx={{ my: 3, bgcolor: "white" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              目次
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ bgcolor: "white" }}>
            {children.map((c: any, i: number) => (
              <Box key={i}>{renderNode(c, i)}</Box>
            ))}
          </AccordionDetails>
        </Accordion>
      );
    }
    if (tag === "SupplProvision") {
      return (
        <Accordion key={`suppl-${key}`} sx={{ my: 3, bgcolor: "white" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              附則
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ bgcolor: "white" }}>
            {children.map((c: any, i: number) => (
              <Box key={i}>{renderNode(c, i)}</Box>
            ))}
          </AccordionDetails>
        </Accordion>
      );
    }

    if (tag === "Part") {
      const titleNode = children.find((c: any) => c.tag === "PartTitle");
      const contentNodes = children.filter((c: any) => c.tag !== "PartTitle");

      return (
        <Accordion
          key={`part-${key}`}
          expanded={openPart === `part-${key}`}
          onChange={() => {
            if (openChapter !== null) {
              pendingPartToOpen.current = `part-${key}`;
              setOpenChapter(null);
            } else {
              togglePart(`part-${key}`);
            }
          }}
          sx={{ my: 3, bgcolor: "white" }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {titleNode && renderNode(titleNode)}
          </AccordionSummary>

          <AccordionDetails sx={{ bgcolor: "white" }}>
            {contentNodes.map((c: any, i: number) => (
              <Box key={i}>{renderNode(c, i)}</Box>
            ))}
          </AccordionDetails>
        </Accordion>
      );
    }

    if (tag === "Chapter") {
      const titleNode = children.find((c: any) => c.tag === "ChapterTitle");
      const contentNodes = children.filter((c: any) => c.tag !== "ChapterTitle");

      return (
        <Accordion
          key={`chapter-${key}`}
          expanded={openChapter === `chapter-${key}`}
          onChange={() => toggleChapter(`chapter-${key}`)}
          sx={{ my: 3, bgcolor: "white" }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {titleNode && renderNode(titleNode)}
          </AccordionSummary>

          <AccordionDetails
            sx={{ bgcolor: "white" }}
            onTransitionEnd={() => {
              if (pendingPartToOpen.current) {
                togglePart(pendingPartToOpen.current);
                pendingPartToOpen.current = null;
              }
            }}
          >
            {contentNodes.map((c: any, i: number) => (
              <Box key={i}>{renderNode(c, i)}</Box>
            ))}
          </AccordionDetails>
        </Accordion>
      );
    }

    if (tag === "Article") {
      return (
        <Paper
          key={`article-${key}`}
          elevation={1}
          sx={{
            p: 3,
            my: 4,
            borderLeft: "6px solid",
            borderColor: "primary.main",
            bgcolor: "white",
          }}
        >
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {children.map((c: any, i: number) => (
              <Box key={i}>{renderNode(c, i)}</Box>
            ))}
          </Box>
        </Paper>
      );
    }

    return (
      <>
        {children.map((c: any, i: number) => (
          <span key={i}>{renderNode(c, i)}</span>
        ))}
      </>
    );
  };

  return (
    <Box component="article" sx={{ maxWidth: 900, mx: "auto", p: 3, bgcolor: "white" }}>
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h3" sx={{ fontWeight: "black" }}>
          {LawData.revision_info.law_title}
        </Typography>

        {LawData.revision_info.abbrev && (
          <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
            （{LawData.revision_info.abbrev}）
          </Typography>
        )}

        {LawData.revision_info.amendment_law_title && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            改正：{LawData.revision_info.amendment_law_title}
            （{LawData.revision_info.amendment_enforcement_date}施行）
          </Typography>
        )}
      </Box>

      <Box>
        {LawData.law_full_text.children.map((child: any, i: number) => (
          <Box key={i}>{renderNode(child, i)}</Box>
        ))}
      </Box>
    </Box>
  );
};

export default LawDetails;
