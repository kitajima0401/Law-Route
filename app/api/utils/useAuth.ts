import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtVerify } from "jose";

const useAuth = () => {
  const [loginUserEmail, setLoginUserEmail] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(()=>{
    const checkToken = async() => {
      const token = localStorage.getItem("token")

      console.log("localStorageから取得したtoken:", token)
      console.log("tokenの型:", typeof token)
      console.log("tokenの長さ:", token?.length)
      console.log("ドットの数（パート数）:", token?.split('.').length)

      if(!token){
        router.push("/login")
        setIsLoading(false)
        return
      }

      try{
        const secretKey = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)
        const decodedJwt = await jwtVerify(token, secretKey)

        console.log("JWT検証成功！payload:", decodedJwt.payload)

        setLoginUserEmail(decodedJwt.payload.email as string)
        setIsLoading(false)
      }catch(error){
        console.log("JWT verification failed:", error)
        router.push("/login")
        setIsLoading(false)
      }

    }

    checkToken()
  },[router])


  return {loginUserEmail, isLoading}
}

export default useAuth