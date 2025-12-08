import { NextRequest, NextResponse } from "next/server";
import { ItemModel } from "../../utils/schemaModels";
import { UserModel } from "../../utils/schemaModels";
import connectDB from "../../utils/database";

export async function POST(request: NextRequest){
  await connectDB()
  const reqBody = await request.json()
  const savedUserEmail = await UserModel.findOne({email: reqBody.email})
  if(!savedUserEmail){
    return NextResponse.json({message: "ログインしてください"})
  }
  try{
    ItemModel.create(reqBody)
    return NextResponse.json({message: "お気に入り登録追加成功"})
  }catch(err){
    return NextResponse.json({message: "お気に入り登録追加失敗"})
  }
}