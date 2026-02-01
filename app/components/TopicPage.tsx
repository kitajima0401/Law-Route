"use client"

import useAuth from "../api/utils/useAuth"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { 
    Box, 
    Typography,
    Button,
    Accordion, 
    AccordionSummary, 
    AccordionDetails, 
    CircularProgress 
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { lawItems } from "../components/Lawmenu"

interface LawNode {
    tag: string;
    attr?: Record<string, string | undefined>;
    children?: (string | LawNode)[];
}

interface ArticleNode extends LawNode {
    tag: "Article";
    attr: { Num: string };
}

//条を集める
function findArticlesDeep(node: any, result: ArticleNode[] = []){
    if(!node) return result;
    if (node.tag === "SupplProvision" || node.tag === "SupplementaryProvision") {
        return result
    }
    if(node.tag === "Article") result.push(node)
    if(Array.isArray(node.children)){
        for(const child of node.children){
            if(typeof child === "object") findArticlesDeep(child, result)
        }
    }
    return result
}
//号の集まりを集める
function collectSentences(node: any, result: string[]=[]): string[]{
    if(!node)return result;
    if(node.tag === "Sentence" && Array.isArray(node.children)){
        for(const c of node.children) if(typeof c === "string")result.push(c)
    }
    if(Array.isArray(node.children)){
        for(const child of node.children){
            if(typeof child === "object")collectSentences(child, result)
        }
    }
    return result
}

function extractCaption(article: any): { capText: string; titleText: string }{
    const cap = article.children?.find((c: any)=>c.tag === "ArticleCaption");
    const title = article.children?.find((c: any)=>c.tag === "ArticleTitle");

    const capText = 
        cap?.children?.filter((x:any)=>typeof x === "string").join("")||"";
    const titleText =
        title?.children?.filter((x:any)=>typeof x === "string").join("")||"";
    
    return {capText, titleText}
}
//号を描画
function renderItem(node:any, keyPrefix = ""){
    if(!node)return null;

    const sentences = collectSentences(node);
    if(sentences.length===0) return null;

    const num = node.attr?.Num;
    const subItems = node.children?.filter((c:any)=>c.tag==="Item")||[];

    return(
        <Box  key={keyPrefix} sx={{ml:4, mt:1}}>
            {num?(
                <Typography sx={{fontWeight:"bold", mb:1}}>{num}</Typography>
            ):null}

            {sentences.map((t:string, i:number)=>(
                <Typography key={i} sx={{mb:1, lineHeight: 1.8}}>
                    {t}
                </Typography>
            ))}

            {subItems.map((it:any, i:number)=>
                renderItem(it, keyPrefix+"-sub"+i)
            )}
        </Box>
    )
}
// 項を描画
function renderParagraph(node:any, keyPrefix=""){
    if(!node)return null;

    const sentences = collectSentences(node);
    if(sentences.length===0)return null;

    const num = node.attr?.Num;
    const items = node.children?.filter((c:any)=>c.tag==="Item")||[];

    return(
        <Box key={keyPrefix} sx={{mb:1, lineHeight:1.8}}>
            {num?(
                <Typography sx={{fontWeight:"bold", mb:1}}>({num})</Typography>
            ):null}

            {sentences.map((t:string, i:number)=>(
                <Typography key={i} sx={{mb:1, lineHeight:1.8}}>
                    {t}
                </Typography>
            ))}

            {items.map((it:any, i:number)=>
                renderItem(it, keyPrefix+"-item"+i)
            )}
        </Box>
    )
}

export default function TopicPage(){
    const params = useSearchParams();
    const lawTitle = params.get("law")
    const topicTitle = params.get("topic")
    const revision = params.get("revision")

    const[articles, setArticles]=useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const {loginUserEmail} = useAuth()
    const law = lawItems.find((l)=>l.title === lawTitle)
    const topic = law?.items.flatMap((i)=>i.topics).find((t)=>t.title===topicTitle)
    const [bookmarks, setBookmarks] = useState<any[]>([])

    useEffect(() => {
    const data = JSON.parse(localStorage.getItem("articleBookmarks") || "[]")
    setBookmarks(data)
    }, [])

    useEffect(()=>{
        if(!revision||!topic) return;

        const fetchJSON = async()=>{
            setLoading(true);

            const res = await fetch(`/api/item/getFullText`,{
                method: "POST",
                body: JSON.stringify({law_revision_id: revision}),
                headers: {"Content-Type": "application/json"},
            })

            const json = await res.json();
            const allArticles = findArticlesDeep(json.law_full_text);

            const filtered = allArticles.filter((a:any)=>{
                const num = parseInt(a.attr?.Num, 10);
                return topic.articles.some((r)=>{
                    const s = parseInt(r.start, 10);
                    const e = parseInt(r.end, 10);
                    return num >= s && num <=e
                })
            })

            setArticles(filtered)
            setLoading(false)
        }

        fetchJSON()
    }, [revision, topic])

    if(!law || !topic) return <Typography>データが見つかりませんでした</Typography>

    return(
        <Box sx={{maxWidth:900, mx: "auto", py:12}}>
            <Typography variant="h4" sx={{mb: 4}}>{topic.title}</Typography>
            <Typography variant="h6" sx={{mb: 3}}>{law.title}</Typography>

            {loading&& <CircularProgress/>}

            {!loading && articles.length===0 &&(
                <Typography>該当する条文がありません</Typography>
            )}

            {!loading&&
                articles.map((a:any, idx:number)=>{
                    const num = a.attr?.Num
                    const {capText, titleText} = extractCaption(a)
                    const paragraphs = a.children?.filter((c:any)=>c.tag==="Paragraph")||[];

                    const isBookmarked = 
                    bookmarks.some( (b) => 
                        b.law === law.title && 
                        b.topic === topic.title && 
                        b.num === num && 
                        b.revision === revision )
                    const toggleBookmark = () => {
                        let updated
                        if (isBookmarked) {
                            updated = bookmarks.filter(
                                (b) => 
                                !(b.law === law.title && 
                                b.topic === topic.title &&
                                b.num === num && 
                                b.revision === revision 
                                ) 
                            ) 
                        } else { 
                            updated = [ 
                                ...bookmarks, { 
                                    law: law.title, 
                                    topic: topic.title, 
                                    num, 
                                    revision, 
                                    timestamp: Date.now(), 
                                }, 
                            ]
                        } 
                        setBookmarks(updated) 
                        localStorage.setItem("articleBookmarks", JSON.stringify(updated)) 
                        window.dispatchEvent(new Event("bookmarks-updated"))
                    }

                    return(
                        <Accordion key={idx} sx={{mb:2}}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                <Box>
                                    <Typography sx={{fontWeight:"bold"}}>第{num}条</Typography>
                                    {capText&&(
                                        <Typography sx={{fontSize:14, color:"gray"}}>
                                            {capText}
                                        </Typography>
                                    )}
                                    {titleText&&(
                                        <Typography sx={{fontSize:14, color:"gray"}}>
                                            {titleText}
                                        </Typography>
                                    )}
                                </Box>
                            </AccordionSummary>

                            <AccordionDetails>
                                {paragraphs.map((p:any, i:number)=>
                                    renderParagraph(p, `p-${num}-${i}`)
                                )}
                                <Button
                                    variant="outlined"
                                    color={isBookmarked ? "error" : "primary"}
                                    onClick={toggleBookmark}
                                    sx={{ mt: 1 }}
                                >
                                    {!loginUserEmail ? "ログインして、ブックマーク登録をしましょう" : (
                                        isBookmarked ? "ブックマーク削除" : "ブックマーク登録"
                                    )}
                                </Button>
                            </AccordionDetails>
                        </Accordion>
                    )
                })
            }
        </Box>
    )
}