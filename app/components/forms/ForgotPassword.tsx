"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Box, TextField, Button, Typography } from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import api from "@/lib/axios"
import { toast } from "react-toastify"
interface ForgotPasswordProps{
    onSuccess?:()=>void
}
export default function ForgotPassword({onSuccess}:ForgotPasswordProps={}){
    const router = useRouter()
    const [email, setEmail]=useState<string>("")
    const mutation = useMutation({
        mutationFn: (email: string) => {
            return api.post("/api/user/forgot-password",{email})
        },
        onSuccess:()=>{
            toast.success("リセット用メールを送信しました。メールをご確認ください。")
            if(onSuccess){
                onSuccess()
            }else{
                router.push("/login")
            }
        },
        onError:(err: any)=>{
            toast.error(err.response?.data?.message || "送信に失敗しました")
        }
    })

    const handleSubmit = (e: React.FormEvent)=>{
        e.preventDefault()
        if(!email.trim())return
        mutation.mutate(email.trim())
    }

    return(
        <Box component="form" onSubmit={handleSubmit} sx={{display: "flex", flexDirection:"column", gap:3, width:"100%"}}>
            <Typography variant="h5" align="center"sx={{pt: 12}} >
                パスワードをリセット
            </Typography>
            <TextField 
                label="登録メールアドレス" 
                type="email" 
                value={email} 
                onChange={(e)=>setEmail(e.target.value)} 
                fullWidth 
                required 
                autoFocus
            />
            <Button 
                variant="contained" 
                type="submit" 
                disabled={mutation.isPending || !email.trim()}
                fullWidth
            >
                {mutation.isPending?"送信中...":"リセットメールを送信"}
            </Button>
            
        </Box>
    )
}

