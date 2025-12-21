"use client"
import { registerSchema, RegisterSchema } from "@/app/lib/validation/registerSchema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import api from "@/app/lib/axios"

import { TextField, Button, Container, Box, Typography } from "@mui/material"

const RegisterForm = () => {
  const router = useRouter()
  const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema)})

  const registerMutation = useMutation({
    mutationFn:(data: RegisterSchema)=>{
      return api.post("/api/user/register", data)
    },
    onSuccess:(res)=>{
      toast.success(res.data.message)
      router.push("/login")
    },
    onError:(error: any)=>{
      const message = error.response?.data?.message 
      toast.error(message)
    }
  })

  const onSubmit = (data: RegisterSchema) => {
    registerMutation.mutate(data)
  }

  return(
    <Container maxWidth="sm" sx={{mt: 8, minHeight: "100vh"}}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{display: "flex", flexDirection: "column", gap: 3}}>
        <Typography variant="h4" component="h1" align="center" gutterBottom fontWeight="bold">新規登録</Typography>
        <TextField variant="outlined" {...register("name")} label="ユーザーネーム" error={!!errors.name} helperText={errors.name?.message} disabled={isSubmitting} />
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