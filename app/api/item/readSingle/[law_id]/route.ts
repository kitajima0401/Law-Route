import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
  try{
    return NextResponse.json({message: "laws取得成功"})
  }catch{
    return NextResponse.json({message: "laws取得失敗"})
  }
}