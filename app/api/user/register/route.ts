import { NextRequest, NextResponse } from "next/server";
import { UserModel } from "../../utils/schemaModels";
import connectDB from "../../utils/database";

export async function POST(request: NextRequest){
  const reqBody = await request.json()
  try{
    await connectDB()
    await UserModel.create(reqBody)
    return NextResponse.json({message: "ユーザー登録成功"})
  }catch(err){
    return NextResponse.json({message: "ユーザー登録失敗"})
  }
}