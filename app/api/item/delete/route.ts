import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
  try{
    return NextResponse.json({message: "お気に入り登録削除成功"})
  }catch(err){
    return NextResponse.json({message: "お気に入り登録削除失敗"})
  }
}