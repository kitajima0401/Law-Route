import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtVerify } from "jose";

const useAuth = () => {
  const [loginUserEmail, setLoginUserEmail] = useState<string>("")
  const router = useRouter()
  useEffect(()=>{
    const checkToken = async() => {
      const token = localStorage.getItem("token")
      if(!token){
        router.push("/login")
        return
      }
      try{
        const secretKey = new TextEncoder().encode("law-route")
        const decodedJwt = await jwtVerify(token, secretKey)
        setLoginUserEmail(decodedJwt.payload.email as string)
      }catch(err){
        router.push("/login")
        return
      }
    }
    checkToken()
  },[router])
  return loginUserEmail
}

export default useAuth