"use client"
import { loginSchema, LoginSchema } from "@/app/lib/validation/loginSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useLogin } from "@/app/hooks/useLogin"

import { Container, Box, TextField, Button, Typography } from "@mui/material"


const LoginForm = () => {
  const { register, handleSubmit, formState: {errors}} = useForm<LoginSchema>({resolver: zodResolver(loginSchema)})

  const loginMutation = useLogin()

  const onSubmit = (data: LoginSchema) => {
    loginMutation.mutate(data)
  }

  return(
    <Container maxWidth="sm" sx={{mt: 8, minHeight: "100vh"}}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{display: "flex", flexDirection: "column", gap: 3}}  >
        <Typography variant="h4" component="h1" align="center" gutterBottom fontWeight="bold">ログイン</Typography>

        <TextField variant="outlined" label="メールアドレス" error={!!errors.email} {...register("email")} helperText={errors.email?.message} disabled={loginMutation.isPending} />

        <TextField variant="outlined" label="パスワード" error={!!errors.email} {...register("password")} helperText={errors.password?.message} disabled={loginMutation.isPending} />

        <Button variant="contained" type="submit" disabled={loginMutation.isPending}>
          {loginMutation.isPending? "ログイン中...": "ログイン"}
        </Button>
      </Box>
    </Container>
  )
}

export default LoginForm
