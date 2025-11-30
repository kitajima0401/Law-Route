import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
  try{
    return NextResponse.json({message: "お気に入り登録追加成功"})
  }catch(err){
    return NextResponse.json({message: "お気に入り登録追加失敗"})
  }
}