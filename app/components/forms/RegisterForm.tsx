"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { registerSchema, RegisterSchema } from "@/app/lib/validation/registerSchema"
import { useState } from "react"

import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  CircularProgress,
} from "@mui/material";

export default function RegisterForm(){
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = async(data: RegisterSchema) => {
    setIsLoading(true)
    console.log("Form data submitted:", data); 
    try{
      console.log("Attempting to fetch API at:", "/api/user/register"); 
      const res = await fetch("/api/user/register",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })

      console.log("API response status:", res.status); 
      const jsonData = await res.json()
      console.log("API response body:", jsonData);
      
      if(!res.ok){
        console.error("API error detected:", jsonData.message); 
        throw new Error(jsonData.message)
      }
      toast.success("登録成功 ログインしてください")
      router.push("/login")
    }catch(err: any){
      console.error("Fetch operation failed:", err.message)
      toast.error(err.message)
    }finally{
      setIsLoading(false)
      console.log("Submit process finished.")
    }
  }

  return(
    // <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-sm mx-auto">
    //   <div>
    //     <input {...register("name")} placeholder="名前" className="border p-2 w-full" disabled={isLoading}/>
    //     {errors.name&&<p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
    //   </div>
    //   <div>
    //     <input {...register("email")} placeholder="メールアドレス" className="border p-2 w-full" disabled={isLoading}/>
    //     {errors.email&&<p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
    //   </div>
    //   <div>
    //     <input {...register("password")} placeholder="パスワード" className="border p-2 w-full" disabled={isLoading}/>
    //     {errors.password&&<p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
    //   </div>
    //   <button type="submit" disabled={isLoading} className="bg-blue-600 text-white p-2 rounded mt-3 disabled:bg-blue-400">
    //     {isLoading?"登録中...":"新規登録"}
    //   </button>
    // </form>
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          新規登録
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 3 }}
        >
          {/* 名前 */}
          <TextField
            label="名前"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message as string}
            disabled={isLoading}
            fullWidth
          />

          {/* メールアドレス */}
          <TextField
            label="メールアドレス"
            type="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message as string}
            disabled={isLoading}
            fullWidth
          />

          {/* パスワード */}
          <TextField
            label="パスワード"
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message as string}
            disabled={isLoading}
            fullWidth
          />

          {/* 送信ボタン */}
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
            sx={{ mt: 2 }}
          >
            {isLoading ? "登録中..." : "新規登録"}
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}