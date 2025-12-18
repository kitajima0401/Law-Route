"use client"
import { registerSchema, RegisterSchema } from "@/app/lib/validation/registerSchema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

import { TextField, Button, Container, Box, Typography } from "@mui/material"

const RegisterForm = () => {
  const router = useRouter()
  const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema)})

  const onSubmit = async(data: RegisterSchema) => {
    try{
      const res = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      const jsonData = await res.json()
      toast.success(jsonData.message)
      router.push("/login")
    }catch(err){
      console.error("新規登録失敗: RegisterForm.tsx", err)
      toast.error("ユーザー登録失敗 やり直してください")
      router.push("/")
    }
  }

  return(
    <Container maxWidth="sm" sx={{mt: 8, minHeight: "100vh"}}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{display: "flex", flexDirection: "column", gap: 3}}>
        <Typography variant="h4" component="h1" align="center" gutterBottom fontWeight="bold">新規登録</Typography>
        <TextField variant="outlined" {...register("name")} label="ユーザーネーム" error={!!errors.name} helperText={errors.name?.message} />
        <TextField variant="outlined" {...register("email")} label="メールアドレス" error={!!errors.email} helperText={errors.email?.message} />
        <TextField variant="outlined" {...register("password")} label="パスワード" error={!!errors.password} helperText={errors.password?.message} />
        <Button variant="contained" type="submit">
          { isSubmitting ? "登録中..." : "登録"}
        </Button>
      </Box>
    </Container>
  )
}

export default RegisterForm