"use client"
import { useRouter } from "next/navigation"
import { loginSchema, LoginSchema } from "@/lib/validation/loginSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useLogin } from "@/app/hooks/useLogin"

import { Container, Box, TextField, Button, Typography } from "@mui/material"


const LoginForm = () => {
  const { register, handleSubmit, formState: {errors}} = useForm<LoginSchema>({resolver: zodResolver(loginSchema)})

  const router = useRouter()

  const loginMutation = useLogin()

  const onSubmit = (data: LoginSchema) => {
    loginMutation.mutate(data)
  }

  return(
    <Container maxWidth="sm" sx={{pt:12, mt: 8, minHeight: "100vh"}}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{display: "flex", flexDirection: "column", gap: 3}}  >
        <Typography variant="h4" component="h1" align="center" gutterBottom fontWeight="bold">ログイン</Typography>

        <TextField variant="outlined" label="メールアドレス" error={!!errors.email} {...register("email")} helperText={errors.email?.message} disabled={loginMutation.isPending} />

        <TextField variant="outlined" type="password" label="パスワード" error={!!errors.email} {...register("password")} helperText={errors.password?.message} disabled={loginMutation.isPending} />

        <Box sx={{textAlign: "right", mt: -1}}>
          <Typography variant="body2" color="primary" onClick={()=>router.push("../forgot-password")} sx={{cursor: "pointer"}}>
            パスワードを忘れた方はこちら
          </Typography>
        </Box>

        <Button variant="contained" type="submit" disabled={loginMutation.isPending}>
          {loginMutation.isPending? "ログイン中...": "ログイン"}
        </Button>
      </Box>
    </Container>
  )
}

export default LoginForm
