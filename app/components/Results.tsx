"use client"
import Link from "next/link"
import { useState } from "react"


type Props = {
  results: any[] | null,
  keyword: string
  isLoading: boolean
}

const Results = ({results, keyword, isLoading}: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  
  if(isLoading){
    return(
      <div>検索中...</div>
    )
  }

  if(!results || results.length === 0){
    return null
  }

  

  return(
    <>
      <div>
        <h2>{keyword}の検索結果</h2>
        <div>
          {results.map(result=>
              <div key={result.law_info.law_id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 hover:shadow-md transition-shadow">

                <p className="text-gray-600 font-medium mb-6">法令番号: {result.law_info.law_num}</p>

                <div>{result.revision_info.law_title}</div>

                <span className="inline-block px-4 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">カテゴリー: {result.revision_info.category}</span>

                <button onClick={()=>setIsOpen(!isOpen)} className="px-6 py-2 border border-blue-700 text-blue-700 font-medium rounded hover:bg-blue-50 transition">詳細</button>

                {isOpen && result.sentences.map((s: any, i: number)=>
                  <div key={i} 
                  className="mt-4 p-5 bg-blue-50 border-l-4 border-blue-700 rounded-r-lg 
              text-gray-800 leading-8 text-base
                wrap-break-word overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: s.text }}
                  />
                )}

                <div className="mt-8 text-right">
                  <Link className="px-6 py-2 border border-blue-700 text-blue-700 font-medium rounded hover:bg-blue-50 transition" href={`/lawDetailPage/${result.revision_info.law_revision_id}`}>
                    本文を表示
                  </Link>
                  <Link href={`${process.env.NEXT_PUBLIC_URL}/mypage`} className="px-6 py-2 border border-blue-700 text-blue-700 font-medium rounded hover:bg-blue-50 transition">お気に入り登録</Link>
                </div>

              </div>
            )
          }
        </div>
      </div>
    </>
  )
}
  

export default Results