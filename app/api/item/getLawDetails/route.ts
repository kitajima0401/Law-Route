import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest){
  const reqBody = await request.json()
  const law_id = reqBody.law_id
  try{
    const response = await fetch(`https://laws.e-gov.go.jp/api/2/law_data/${law_id}`)
    const data = await response.json()
    return NextResponse.json({message: "法令本文取得成功", data: data})
  }catch(err){
    return NextResponse.json({message: "法令本文取得失敗"})
  }
}