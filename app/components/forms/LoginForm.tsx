"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { loginSchema, LoginSchema } from "@/app/lib/validation/loginSchema"

export default function LoginForm(){
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginSchema)=>{
    setIsLoading(true)
    console.log("Form data submitted:", data); 
    try{
      console.log("Attempting to fetch API at:", "/api/user/login"); 
      const res = await fetch("/api/user/login",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })

      console.log("API response status:", res.status); 
      const jsonData = await res.json()
      console.log("API response body:", jsonData)

      if(!res.ok){
        console.error("API error detected:", jsonData.message); 
        throw new Error(jsonData.message)
      }
      localStorage.removeItem("token")
      localStorage.setItem("token", jsonData.token)

      toast.success("ログイン成功")
      router.push("/mypage")
    }catch(err: any){
      toast.error(err.message)
    }finally{
      setIsLoading(false)
    }
  }

  return(
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <input {...register("email")} placeholder="email" className="border p-2 " disabled={isLoading}/>
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <input {...register("password")} type="password" placeholder="password" className="border p-2" disabled={isLoading}/>
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}

      <button type="submit" className="bg-blue-600 text-white p-2 rounded mt-3" disabled={isLoading}>
        {isLoading?"ログイン中...":"ログイン"}
      </button>
  </form>
  )
}