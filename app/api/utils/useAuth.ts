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

      if(!token){
        router.push("/login")
        setIsLoading(false)
        return
      }

      try{
        const secretKey = new TextEncoder().encode("law-route")
        const decodedJwt = await jwtVerify(token, secretKey)
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