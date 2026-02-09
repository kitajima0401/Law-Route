// type LawJson = any

// export type Paragraph = { 
//     num: string 
//     sentences: string[] }

// export type Article = {
//     num: string,
//     title: string,
//     caption: string,
//     paragraphs: Paragraph[]
// }

// export type ArticleMap = Record<string, Article>

// export function buildArticleMap(json: LawJson): ArticleMap {
//     const map: ArticleMap = {} 
//     json.MainProvision.Part.forEach((part: any) => {
//         part.Chapter?.forEach((chapter: any) => { 
//             chapter.Article?.forEach((article: any) => { 
//                 const rawTitle = article.ArticleTitle?._text ?? '' 
//                 const num = rawTitle.replace('第', '').replace('条', '').trim() 
//                 if (!num) return 
//                 const paragraphs: Paragraph[] = 
//                     article.Paragraph?.map((p: any) => ({ 
//                         num: p.ParagraphNum?._text ?? '', 
//                         sentences: 
//                             p.ParagraphSentence?.Sentence?.map((s: any) => s._text) ?? [], 
//                         })) ?? [] 
//                     map[num] = { 
//                         num, 
//                         title: rawTitle, 
//                         caption: article.ArticleCaption?._text ?? '',
//                         paragraphs, } }) }) }) 
//     return map 
// }