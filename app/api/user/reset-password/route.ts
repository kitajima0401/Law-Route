import { NextRequest, NextResponse } from "next/server"
import connectDB from "../../utils/database"
import { UserModel } from "../../utils/schemaModels"
import bcrypt from "bcryptjs"

export async function POST(req: NextRequest){
    try{
        await connectDB()
        const {token, newPassword} = await req.json()
        if(!token || !newPassword || newPassword.length<8){
            return NextResponse.json(
                {message: "トークンまたは有効なパスワード(8文字以上)が不足しています"}
            )
        }
        const user = await UserModel.findOne({
            resetToken: token,
            resetTokenExpires:{$gt: new Date()} //調べる
        })
        if(!user){
            return NextResponse.json(
                {message: "無効なトークン、または期限切れです"}
            )
        }

        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        user.password = hashedPassword
        user.resetToken = null
        user.resetTokenExpires = null
        await user.save()

        return NextResponse.json(
            {message: "パスワードをリセットしました。新しいパスワードでログインしてください。"}
        )
    }catch(err){
        return NextResponse.json(
            {message: "サーバーエラーが発生しました"}
        )
    }
}

