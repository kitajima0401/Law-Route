// "use client";

// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   CircularProgress,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// interface LawNode {
//   tag: string;
//   attr?: Record<string, string | boolean | undefined>;
//   children?: (string | LawNode)[];
// }

// interface ArticleNode extends LawNode {
//   tag: "Article";
//   attr: {
//     Num: string;
//     [key: string]: string | boolean | undefined;
//   };
// }

// interface NumberedNode extends LawNode {
//   attr?: {
//     Num?: string;
//     [key: string]: string | boolean | undefined;
//   };
// }

// interface Topic {
//   title: string;
//   articles: { start: string; end: string }[];
// }

// interface MenuItem {
//   title: string;
//   topics: Topic[];
// }

// interface LawMenu {
//   title: string;
//   items: MenuItem[];
// }

// interface LawFullTextResponse {
//   law_full_text: LawNode;
// }

// function isLawNode(value: unknown): value is LawNode {
//   return (
//     value != null &&
//     typeof value === "object" &&
//     "tag" in value &&
//     typeof (value as any).tag === "string"
//   );
// }

// function findArticlesDeep(node: LawNode | null, result: ArticleNode[] = []): ArticleNode[] {
//   if (!node) return result;
//   if (node.tag === "Article") {
//     result.push(node as ArticleNode);
//   }
//   if (Array.isArray(node.children)) {
//     for (const child of node.children) {
//       if (isLawNode(child)) {
//         findArticlesDeep(child, result);
//       }
//     }
//   }
//   return result;
// }

// function collectSentences(node: LawNode | null, result: string[] = []): string[] {
//   if (!node) return result;

//   if (node.tag === "Sentence" && Array.isArray(node.children)) {
//     for (const c of node.children) {
//       if (typeof c === "string") {
//         result.push(c);
//       }
//     }
//   }

//   if (Array.isArray(node.children)) {
//     for (const child of node.children) {
//       if (isLawNode(child)) {
//         collectSentences(child, result);
//       }
//     }
//   }
//   return result;
// }

// function extractCaption(article: ArticleNode): {
//   capText: string;
//   titleText: string;
// } {
//   const cap = article.children?.find(
//     (c): c is LawNode => isLawNode(c) && c.tag === "ArticleCaption"
//   );
//   const title = article.children?.find(
//     (c): c is LawNode => isLawNode(c) && c.tag === "ArticleTitle"
//   );

//   const capText =
//     cap?.children
//       ?.filter((x): x is string => typeof x === "string")
//       .join("") || "";

//   const titleText =
//     title?.children
//       ?.filter((x): x is string => typeof x === "string")
//       .join("") || "";

//   return { capText, titleText };
// }

// function renderItem(node: NumberedNode, keyPrefix = ""): JSX.Element | null {
//   if (!node) return null;

//   const sentences = collectSentences(node);
//   if (sentences.length === 0) return null;

//   const num = node.attr?.Num;
//   const subItems = node.children?.filter(
//     (c): c is NumberedNode => isLawNode(c) && c.tag === "Item"
//   ) || [];

//   return (
//     <Box key={keyPrefix} sx={{ ml: 4, mt: 1 }}>
//       {num && (
//         <Typography sx={{ fontWeight: "bold", mb: 1 }}>{num}</Typography>
//       )}

//       {sentences.map((t, i) => (
//         <Typography key={i} sx={{ mb: 1, lineHeight: 1.8 }}>
//           {t}
//         </Typography>
//       ))}

//       {subItems.map((it, i) => renderItem(it, `${keyPrefix}-sub${i}`))}
//     </Box>
//   );
// }

// function renderParagraph(node: NumberedNode, keyPrefix = ""): JSX.Element | null {
//   if (!node) return null;

//   const sentences = collectSentences(node);
//   if (sentences.length === 0) return null;

//   const num = node.attr?.Num;
//   const items = node.children?.filter(
//     (c): c is NumberedNode => isLawNode(c) && c.tag === "Item"
//   ) || [];

//   return (
//     <Box key={keyPrefix} sx={{ mb: 1, lineHeight: 1.8 }}>
//       {num && (
//         <Typography sx={{ fontWeight: "bold", mb: 1 }}>({num})</Typography>
//       )}

//       {sentences.map((t, i) => (
//         <Typography key={i} sx={{ mb: 1, lineHeight: 1.8 }}>
//           {t}
//         </Typography>
//       ))}

//       {items.map((it, i) => renderItem(it, `${keyPrefix}-item${i}`))}
//     </Box>
//   );
// }

// export default function TopicPage() {
//   const params = useSearchParams();
//   const lawTitle = params.get("law");
//   const topicTitle = params.get("topic");
//   const revision = params.get("revision");

//   const [articles, setArticles] = useState<ArticleNode[]>([]);
//   const [loading, setLoading] = useState(true);

//   const law = (lawItems as LawMenu[]).find((l) => l.title === lawTitle);
//   const topic = law?.items
//     .flatMap((i) => i.topics)
//     .find((t) => t.title === topicTitle);

//   useEffect(() => {
//     if (!revision || !topic) return;

//     const fetchJSON = async () => {
//       setLoading(true);

//       const res = await fetch(`/api/item/getFullText`, {
//         method: "POST",
//         body: JSON.stringify({ law_revision_id: revision }),
//         headers: { "Content-Type": "application/json" },
//       });

//       if (!res.ok) {
//         setLoading(false);
//         return;
//       }

//       const json = (await res.json()) as LawFullTextResponse;
//       const allArticles = findArticlesDeep(json.law_full_text);

//       const filtered = allArticles.filter((a) => {
//         const num = parseInt(a.attr.Num, 10);
//         return topic.articles.some((r) => {
//           const s = parseInt(r.start, 10);
//           const e = parseInt(r.end, 10);
//           return num >= s && num <= e;
//         });
//       });

//       setArticles(filtered);
//       setLoading(false);
//     };

//     fetchJSON();
//   }, [revision, topic]);

//   if (!law || !topic) {
//     return <Typography>データが見つかりませんでした。</Typography>;
//   }

//   return (
//     <Box sx={{ maxWidth: 900, mx: "auto", py: 12 }}>
//       <Typography variant="h4" sx={{ mb: 4 }}>
//         {topic.title}
//       </Typography>
//       <Typography variant="h6" sx={{ mb: 3 }}>
//         {law.title}
//       </Typography>

//       {loading && <CircularProgress />}

//       {!loading && articles.length === 0 && (
//         <Typography>該当する条文がありません。</Typography>
//       )}

//       {!loading &&
//         articles.map((a, idx) => {
//           const num = a.attr.Num;
//           const { capText, titleText } = extractCaption(a);
//           const paragraphs = a.children?.filter(
//             (c): c is NumberedNode =>
//               isLawNode(c) && c.tag === "Paragraph"
//           ) || [];

//           return (
//             <Accordion key={idx} sx={{ mb: 2 }}>
//               <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                 <Box>
//                   <Typography sx={{ fontWeight: "bold" }}>第{num}条</Typography>
//                   {capText && (
//                     <Typography sx={{ fontSize: 14, color: "gray" }}>
//                       {capText}
//                     </Typography>
//                   )}
//                   {titleText && (
//                     <Typography sx={{ fontSize: 14, color: "gray" }}>
//                       {titleText}
//                     </Typography>
//                   )}
//                 </Box>
//               </AccordionSummary>

//               <AccordionDetails>
//                 {paragraphs.map((p, i) => renderParagraph(p, `p-${num}-${i}`))}
//               </AccordionDetails>
//             </Accordion>
//           );
//         })}
//     </Box>
//   );
// }