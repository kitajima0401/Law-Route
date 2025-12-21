"use client"
import { registerSchema, RegisterSchema } from "@/app/lib/validation/registerSchema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRegister } from "@/app/hooks/useRegister"

import { TextField, Button, Container, Box, Typography } from "@mui/material"

const RegisterForm = () => {
  const { register, handleSubmit, formState: {errors} } = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema)})

  const registerMutation = useRegister()
  const onSubmit = (data: RegisterSchema) => {
    registerMutation.mutate(data)
  }

  return(
    <Container maxWidth="sm" sx={{mt: 8, minHeight: "100vh"}}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{display: "flex", flexDirection: "column", gap: 3}}>
        <Typography variant="h4" component="h1" align="center" gutterBottom fontWeight="bold">新規登録</Typography>
        <TextField variant="outlined" {...register("name")} label="ユーザーネーム" error={!!errors.name} helperText={errors.name?.message} disabled={registerMutation.isPending} />
        <TextField variant="outlined" {...register("email")} label="メールアドレス" error={!!errors.email} helperText={errors.email?.message} disabled={registerMutation.isPending}/>
        <TextField variant="outlined" {...register("password")} label="パスワード" error={!!errors.password} helperText={errors.password?.message} disabled={registerMutation.isPending}/>
        <Button variant="contained" type="submit">
          { registerMutation.isPending ? "登録中..." : "登録"}
        </Button>
      </Box>
    </Container>
  )
}

export default RegisterForm