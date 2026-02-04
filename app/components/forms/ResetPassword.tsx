"use client"

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, TextField, Button, Typography, Container, Alert } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import { toast } from "react-toastify";
import * as z from "zod"

const resetSchema = z.object({
    newPassword: z.string().min(8, "パスワードは8文字以上で入力してください。"),
    confirmPassword: z.string(),
}).refine((data)=>data.newPassword === data.confirmPassword,{
    message: "パスワードが一致しません",
    path: ["confirmPassword"]
})

type ResetForm = z.infer<typeof resetSchema>

export default function ResetPasswordPage(){
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const [newPassword, setNewPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState<string | null>(null)

    const mutation = useMutation({
        mutationFn: (data: {token: string; newPassword: string}) =>
            api.post("/api/user/reset-password", data),
        onSuccess:()=>{
            toast.success("パスワードをリセットしました。新しいパスワードでログインしてください")
            router.push("/login")
        },
        onError:(err: any)=>{
            const msg = err.response?.data?.message || "リセットに失敗しました。リンクが無効化期限切れです。"
            toast.error(msg)
            setError(msg)
        }
    })
    const handleSubmit = (e: React.FormEvent)=>{
        e.preventDefault()
        setError(null)

        if(!token){
            setError("無効なリセットリンクです。もう一度メール送信からやり直してください。")
            return
        }
        try {
            resetSchema.parse({ newPassword, confirmPassword })
        }catch (err: any) {
            setError(err.errors?.[0]?.message || "入力に誤りがあります")
            return
        }
        mutation.mutate({ token, newPassword })
    }
    if (!token) {
        return (
          <Container maxWidth="sm" sx={{ pt: 12, mt: 8, minHeight: "100vh" }}>
            <Alert severity="error">無効なリセットリンクです。メールからもう一度お試しください。</Alert>
          </Container>
        )
    }
    return (
        <Container maxWidth="sm" sx={{ pt: 12, mt: 8, minHeight: "100vh" }}>
          <Box sx={{ maxWidth: 480, mx: "auto" }}>
            <Typography variant="h4" align="center" gutterBottom>
              新しいパスワードを設定
            </Typography>
    
            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
    
            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <TextField
                label="新しいパスワード"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                fullWidth
                required
                autoFocus
              />
    
              <TextField
                label="パスワード（確認）"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
                required
              />
    
              <Button
                variant="contained"
                type="submit"
                disabled={mutation.isPending || !newPassword || !confirmPassword}
                fullWidth
              >
                {mutation.isPending ? "設定中..." : "パスワードを設定"}
              </Button>
            </Box>
    
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              リンクの有効期限は1時間です。期限切れの場合はもう一度「パスワードを忘れた方」からやり直してください。
            </Typography>
          </Box>
        </Container>
      )
}
