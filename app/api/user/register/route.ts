import { NextRequest, NextResponse } from "next/server";
import { UserModel } from "../../utils/schemaModels";
import connectDB from "../../utils/database";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest){
  const reqBody = await request.json()
  try{
    await connectDB()
  }catch{
    return NextResponse.json({massege: "データベース接続失敗"})
  }
  try{
    const savedUserEmail = await UserModel.findOne({email: reqBody.email})
    if(savedUserEmail){
      return NextResponse.json({message: "該当メールアドレスのユーザーは既に存在します"})
    }
    const hashedPassword = await bcrypt.hash(reqBody.password, 10)
    await UserModel.create({
      name: reqBody.name,
      email: reqBody.email,
      password: hashedPassword
    })
    return NextResponse.json({message: "ユーザー登録成功 ログインしてください"})
  }catch{
    return NextResponse.json({message: "ユーザー登録失敗"})
  }
}