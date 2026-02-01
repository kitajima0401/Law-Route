"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  CircularProgress,
  Collapse,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

type Props = {
  results: any[] | null;
  keyword: string;
  isLoading: boolean;
};

const Results = ({ results, keyword, isLoading }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
        <Typography ml={2}>検索中...</Typography>
      </Box>
    );
  }

  if (!results || results.length === 0) {
    return null;
  }

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>
        「{keyword}」の検索結果
      </Typography>

      <Stack spacing={3}>
        {results.map((result) => (
          <Card key={result.law_info.law_id} variant="outlined" sx={{ p: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                法令番号: {result.law_info.law_num}
              </Typography>

              <Typography variant="h6" component="div" gutterBottom>
                {result.revision_info.law_title}
              </Typography>

              <Chip
                label={`カテゴリー: ${result.revision_info.category}`}
                color="primary"
                size="small"
                sx={{ mb: 2 }}
              />

              <Button
                startIcon={isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                onClick={() => setIsOpen(!isOpen)}
                variant="outlined"
                size="small"
                sx={{ mb: 2 }}
              >
                詳細
              </Button>

              <Collapse in={isOpen}>
                <Box sx={{ pl: 2, py: 2, bgcolor: "primary.50", borderLeft: 4, borderColor: "primary.main" }}>
                  {result.sentences.map((s: any, i: number) => (
                    <Typography
                      key={i}
                      variant="body1"
                      sx={{ mb: 2, "&:last-child": { mb: 0 } }}
                      dangerouslySetInnerHTML={{ __html: s.text }}
                    />
                  ))}
                </Box>
              </Collapse>

              <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
                <Button
                  component={Link}
                  href={`/lawDetailPage/${result.revision_info.law_revision_id}`}
                  variant="outlined"
                >
                  本文を表示
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default Results;