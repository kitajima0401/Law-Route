import { NextRequest, NextResponse } from "next/server";
import { ItemModel } from "../../utils/schemaModels";
import connectDB from "../../utils/database";

export async function POST(request: NextRequest){
  await connectDB()
  const reqBody = await request.json()
  try{
    const laws = ItemModel.find(reqBody.email)
    return NextResponse.json({message: "お気に入り登録削除成功",laws: laws})
  }catch(err){
    return NextResponse.json({message: "お気に入り登録削除失敗"})
  }
}