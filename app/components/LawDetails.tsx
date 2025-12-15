"use client"
import { useEffect, useState } from "react"

type Props = {
  law_revision_id: string
}
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

const LawDetails = ({law_revision_id}: Props) => {
  const [LawData, setLawData] = useState<LawResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [openChapters, setOpenChapters] = useState(new Set<string>())

  const toggleChapter = (chapterNum: string)=>{
    const newSet = new Set(openChapters)
    if(newSet.has(chapterNum)){
      newSet.delete(chapterNum)
    }else{
      newSet.add(chapterNum)
    }
    setOpenChapters(newSet)
  }

  useEffect(()=>{
    const getFullText = async() => {
      try{
        if(!law_revision_id){
          setError("法令IDが指定されていません")
          setLoading(false)
          return
        }

        const response = await fetch("/api/item/getFullText",{
          method: "POST",
          body: JSON.stringify({ law_revision_id }),
          headers: { "Content-Type": "application/json" }
        })

        if(!response.ok) throw new Error("サーバーエラー")
        const data = await response.json()
        console.log(data)
        setLawData(data)
        setLoading(false)
      }catch(err){
        console.log("データ取得失敗", err)
        setError("法令データの読み込みに失敗しました")
        setLoading(false)
      }
    }
    getFullText()
  },[law_revision_id])
  if(loading) return <div>読み込み中...</div>
  if(error) return <div>{error}</div>
  if(!LawData) return null

  const renderNode = (node: any): React.ReactNode => {
    if (typeof node === "string") return node

    const { tag, attr={}, children=[] } = node
    const num = attr.Num || ""

    switch(tag){
      case "LawTitle":
        return <h1 key={`title-${attr.Num}`} className="text-3xl font-bold text-center my-10">{children.map((child: any, i: number) => <span key={i}>{renderNode(child)}</span>)}</h1>;

      case "ChapterTitle":
        return <>{children.map((child: any, i: number) => <span key={i}>{renderNode(child)}</span>)}</>;

      case "ArticleTitle":
        return <span key={`article-title-${attr.Num}`} className="text-xl font-bold text-red-900 mr-3">{children.map((child: any, i: number) => <span key={i}>{renderNode(child)}</span>)}</span>;

      case "ArticleCaption":
        return <span key={`article-caption-${attr.Num}`} className="text-sm text-gray-600">（{children.map((child: any, i: number) => <span key={i}>{renderNode(child)}</span>)}）</span>;

      case "Article":
        return (
          <section key={`article-${attr.Num}`} className="my-10 pl-6 border-l-8 border-blue-600 bg-blue-50 p-6 rounded-r-lg">
            <div className="flex flex-wrap items-baseline gap-2">
              {children.map((child: any, i: number)=><div key={i}>{renderNode(child)}</div>)}
            </div>
          </section>
        );
        case "Paragraph":
          // const paragraphNumDispley = attr.Num && attr.Num !== "1" ? `${attr.Num}`: ""
          return(
            <div key={`paragraph-${attr.Num}`} className="my-4 leading-8 text-lg">
              {/* {paragraphNumDispley && <span className="font-medium">{paragraphNumDispley}</span>} 不具合あったら追加  */}
              {children.map((child: any, i: number)=><span key={i}>{renderNode(child)}</span>)}
            </div>
          )
        case "ParagraphSentence":
        case "Sentence":
          return <span key={`sentence-${attr.Num}`} >{children.map((child: any, i: number)=><span key={i}>{renderNode(child)}</span>)}</span>;
        case "Chapter":
          const isOpen = openChapters.has(num);
          const titleNode = children.find((c: any)=>c.tag === "ChapterTitle");
          const contentNodes = children.filter((c: any)=>c.tag !== "ChapterTitle")
          return(
            <section key={`chapter-${num}`}>
              {titleNode && (
                <h2 onClick={()=>toggleChapter(num)} className="text-2xl font-bold mt-12 mb-6 text-blue-900 border-b-2 border-blue-200 pb-2 cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors">
                  {isOpen ? '▼ ' : '▶ '}
                  {titleNode.children.map((child: any, i: number)=><span key={i}>{renderNode(child)}</span>)}
                </h2>
              )}
              {isOpen && <div className="pl-4 border-l-2 border-blue-100">{contentNodes.map((child: any, i: number)=><div key={i}>{renderNode(child)}</div>)}</div>}
            </section>
          )
        case "MainProvision":
        case "LawBody":
          return <div key={`law-body-${attr.Num}`} className="space-y-4">{children.map((child: any, i: number)=><div key={i}>{renderNode(child)}</div>)}
          </div>;
        default:
          return <>{children.map((child: any, i: number)=><span key={i}>{renderNode(child)}</span>)}</>
    }
  }
  return(
    <article className="max-w-5xl mx-auto p-6 bg-white min-h-screen">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-black text-gray-900">
          {LawData.revision_info.law_title}
        </h1>
        {LawData.revision_info.abbrev && (
          <p className="text-xl text-gray-600 mt-3">（{LawData.revision_info.abbrev}）</p>
        )}
        {LawData.revision_info.amendment_law_title && (
          <p className="text-sm text-gray-500 mt-4">
            改正：{LawData.revision_info.amendment_law_title}
            （{LawData.revision_info.amendment_enforcement_date}施行）
          </p>
        )}
      </header>
      <div className="prose prose-lg max-w-none">
        {LawData.law_full_text.children.map((child: any, i: number)=>(
          <div key={i}>{renderNode(child)}</div>
        ))}
      </div>
    </article>
  )
}

export default LawDetails
