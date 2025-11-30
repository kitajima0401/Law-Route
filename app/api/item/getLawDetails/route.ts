import { NextResponse } from "next/server";
type Law_id = {
  law_id: string
}

export async function POST(request: Law_id){
  try{
    const response = await fetch(`https://laws.e-gov.go.jp/api/2/law_data/${request.law_id}`)
    const data = await response.json()
    return NextResponse.json({message: "法令本文取得成功", data: data})
  }catch(err){
    return NextResponse.json({message: "法令本文取得失敗"})
  }
}