import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(request: NextRequest){
  const token = request.headers.get("Authorization")?.split(" ")[1]
  if(!token){
    return NextResponse.json({message: "トークンがありません"})
  }
  try{
    const secretKey = new TextEncoder().encode("law-route")
    const decodedJwt = await jwtVerify(token, secretKey)
    console.log("decodedJwt: ",decodedJwt)
    return NextResponse.next()
  }catch(err){
    return NextResponse.json({message: "トークンが正しくないので、ログインしてください"})
  }
}

export const config = {
  matcher: ["/api/item/create", "/api/item/update/:path*", "/api/item/delete/:path*"],
}