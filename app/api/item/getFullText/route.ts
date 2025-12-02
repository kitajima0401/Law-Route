import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
  if(!request){
    return NextResponse.json({message: "law_idがありません"})
  }
  try{
    const reqBody = await request.json()
    const law_id = await reqBody.law_id
    const response = await fetch(`https://laws.e-gov.go.jp/api/2/law_data/${law_id}`)
    const data = await response.json()
    return NextResponse.json(data)
  }catch(err){
    return NextResponse.json({message: "lawdetails取得失敗"})
  }
}