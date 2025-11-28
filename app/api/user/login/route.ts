import { NextResponse } from "next/server";
import connectDB from "../../utils/database";
import { UserModel } from "../../utils/schemaModels";
import { SignJWT } from "jose";

export async function POST(request: any){
  const reqBody = await request.json()
  try{
    await connectDB()
    const savedUserdata = await UserModel.findOne({email: reqBody.email})
    if(savedUserdata){
      if(savedUserdata.password === reqBody.password){
        const secretKey = new TextEncoder().encode("law-route")
        const payload = {
          email: reqBody.email
        }
        const token = await new SignJWT(payload).setProtectedHeader({alg: "HS256"}).setExpirationTime("1d").sign(secretKey)
        console.log(token)
        return NextResponse.json({message: "ログイン成功", token: token})
      }else{
        return NextResponse.json({message: "パスワードが異なります。"})
      }
    }else{
      return NextResponse.json({message: "ユーザー登録をしてください。"})
    }
    
  }catch(err){
    return NextResponse.json({message: "ログイン失敗"})
  }
}