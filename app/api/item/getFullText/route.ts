import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
  try{
    const { law_revision_id } = await request.json()
    if(!law_revision_id){
      return NextResponse.json({message: "law_revision_idがありません"})
    }
    const response = await fetch(`https://laws.e-gov.go.jp/api/2/law_data/${law_revision_id}`)
    if(!response.ok){
      throw new Error(`e-Gov API Error: ${response.status}`)
    }
    const data = await response.json()
    console.log(data)
    return NextResponse.json(data)
  }catch(err: any){
    console.error("APIエラー:", err)
    return NextResponse.json({message: "lawdetails取得失敗", error: err.message},{ status: 500})
  }
}