"use client"
import { loginSchema, LoginSchema } from "@/app/lib/validation/loginSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

import { Container, Box, TextField, Button, Typography } from "@mui/material"

const LoginForm = () => {
  const router = useRouter()
  const { register, handleSubmit, formState: {errors, isSubmitting}} = useForm<LoginSchema>({resolver: zodResolver(loginSchema)})

  const onSubmit = async(data: LoginSchema) => {
    try{
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      const jsonData = await res.json()
      localStorage.setItem("token", jsonData.token)
      toast.success(jsonData.message)
      router.push("/mypage")
    }catch(err){
      console.error("ログインエラー LoginForm.tsx", err)
    }
  }

  return(
    <Container maxWidth="sm" sx={{mt: 8, minHeight: "100vh"}}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{display: "flex", flexDirection: "column", gap: 3}}  >
        <Typography variant="h4" component="h1" align="center" gutterBottom fontWeight="bold">ログイン</Typography>
        <TextField variant="outlined" label="メールアドレス" error={!!errors.email} {...register("email")} helperText={errors.email?.message} disabled={isSubmitting} />
        <TextField variant="outlined" label="パスワード" error={!!errors.email} {...register("password")} helperText={errors.password?.message} disabled={isSubmitting} />
        <Button variant="contained" type="submit" disabled={isSubmitting}>
          {isSubmitting? "ログイン中...": "ログイン"}
        </Button>
      </Box>
    </Container>
  )
}

export default LoginForm
