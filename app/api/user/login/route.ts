import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../utils/database";
import { UserModel } from "../../utils/schemaModels";
import { SignJWT } from "jose";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest){
  const reqBody = await request.json()
  if (!reqBody.email || !reqBody.password) {
    return NextResponse.json({ message: "メールアドレスとパスワードを入力してください" }, { status: 400 });
  }
  try{
    await connectDB()
    const savedUserdata = await UserModel.findOne({email: reqBody.email})
    if(!savedUserdata){
      return NextResponse.json({message: "ユーザー登録をしてください"})
    }

    const isPasswordValid = await bcrypt.compare(reqBody.password, savedUserdata.password)
    
    if(!isPasswordValid){
      return NextResponse.json({message: "パスワードが異なります"})
    }

    
    const secretKey = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)
    const payload = {
      email: savedUserdata.email
    }
    const token = await new SignJWT(payload).setProtectedHeader({alg: "HS256"}).setExpirationTime("7d").sign(secretKey)
    console.log("トークン発行: ",token)
    return NextResponse.json({message: "ログイン成功", token: token})
  }catch(err){
    console.error("ログインapiでエラー", err)
    return NextResponse.json({message: "ログイン失敗"})
  }
}