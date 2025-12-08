import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, context: {params: {id: string}}){
  const law_id = context.params.id
  try{
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/getFullText`,{
      method: "POST",
      body: JSON.stringify({ law_id }),
      headers: { "Content-Type": "application/json" }
    })
    const data = await res.json()
    return NextResponse.json({message: "laws取得成功",data: data})
  }catch{
    return NextResponse.json({message: "laws取得失敗"})
  }
}