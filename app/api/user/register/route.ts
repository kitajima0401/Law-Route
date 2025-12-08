import { NextRequest, NextResponse } from "next/server";
import { UserModel } from "../../utils/schemaModels";
import connectDB from "../../utils/database";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest){
  const reqBody = await request.json()
  try{
    await connectDB()
    console.log("データベース接続成功")
  }catch{
    console.log("データベース接続失敗")
    return NextResponse.json({massege: "データベース接続失敗"})
  }
  try{
    const savedUserEmail = await UserModel.findOne({email: reqBody.email})
    if(savedUserEmail){
      return NextResponse.json({message: "該当メールアドレスのユーザーは既に存在します"})
    }else{
      console.log("登録中...")
    }
    const hashedPassword = await bcrypt.hash(reqBody.password, 10)
    await UserModel.create({
      name: reqBody.name,
      email: reqBody.email,
      password: hashedPassword
    })
    console.log("パスワードハッシュ化成功")
    return NextResponse.json({message: "ユーザー登録成功"})
  }catch(err){
    return NextResponse.json({message: "ユーザー登録失敗"})
  }
}