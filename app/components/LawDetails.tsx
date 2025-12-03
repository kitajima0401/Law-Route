"use client"
import { useEffect, useState } from "react"

type Props = {
  law_revision_id: string
}


const LawDetails = ({law_revision_id}: Props) => {
  const [LawData, setLawData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(()=>{
    const getFullText = async() => {
      try{
        if(!law_revision_id){
          setError("法令IDが指定されていません")
          setLoading(false)
          return
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/getFullText`,{
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

    switch(tag){
      case "LawTitle":
        return <h1 className="text-3xl font-bold text-center my-10">{children.map(renderNode)}</h1>;

      case "ChapterTitle":
        return <h2 className="text-2xl font-bold mt-12 mb-6 text-blue-900 border-b-2 border-blue-200 pb-2">{children.map(renderNode)}</h2>;

      case "ArticleTitle":
        return <span className="text-xl font-bold text-red-900 mr-3">{children.map(renderNode)}</span>;

      case "ArticleCaption":
        return <span className="text-sm text-gray-600">（{children.map(renderNode)}）</span>;

      case "Article":
        return (
          <section className="my-10 pl-6 border-l-8 border-blue-600 bg-blue-50 p-6 rounded-r-lg">
            <div className="flex flex-wrap items-baseline gap-2">
              {children.map(renderNode)}
            </div>
          </section>
        );
        case "Paragraph":
          const num = attr.Num && attr.Num !== "1" ? `${attr.Num}`: ""
          return(
            <div className="my-4 leading-8 text-lg">
              {num && <span className="font-medium">{num}</span>}
              {children.map(renderNode)}
            </div>
          )
        case "ParagraphSentence":
        case "Sentence":
          return <>{children.map(renderNode)}</>;
        case "Chapter":
        case "MainProvision":
        case "LawBody":
          return <div className="space-y-4">{children.map(renderNode)}
          </div>;
        default:
          return <>{children.map(renderNode)}</>
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