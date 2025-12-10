"use client"
import LawDetails from "@/app/components/LawDetails";
import Link from "next/link";
import {use} from "react"


export default function LawDetailPage({params}: {params: Promise<{id: string}>}){
  const { id } = use(params)
  return(
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto py-12 px-6">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:underline">
            ←検索結果に戻る
          </Link>
        </div>
        <LawDetails law_revision_id={id}/>
      </div>
    </div>
  )
}