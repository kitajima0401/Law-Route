import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../utils/database";
import { UserModel } from "../../utils/schemaModels";
import crypto from "crypto"
import {Resend} from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest){
    try{
        await connectDB()
        const { email } = await req.json()
        if(!email){
            return NextResponse.json(
                {message: "メールアドレスを入力してください"}
            )
        }
        const user = await UserModel.findOne({
            email: email
        })
        if(!user){
            return NextResponse.json(
                {message: "リセット用メールを送信しました。"}
            )
        }
        const resetToken = crypto.randomBytes(32).toString("hex")
        const expiresAt = new Date(Date.now()+60*60*1000)

        user.resetToken = resetToken
        user.resetTokenExpires = expiresAt
        await user.save()

        const resetUrl = `https://law-route.jp/reset-password?token=${resetToken}`
        await resend.emails.send({
            from: `"law-route"<noreply@law-route.jp>`,
            to: user.email,
            subject: "パスワードリセットのお願い",
            html: `
                <p>パスワードのリセットリクエストを受け付けました。</p>
                <p>以下のリンクをクリックして新しいパスワードを設定してください（1時間以内に有効です）：</p>
                <a href="${resetUrl}">${resetUrl}</a>
                <p>心当たりがない場合はこのメールを無視してください。</p>
            `
        })
        return NextResponse.json(
            {message: "リセット用メールを送信しました。"}
        )
    }catch(err){
        console.error("Forgot password error:")
        return NextResponse.json(
            {message: "サーバーエラー"}
        )
    }
}