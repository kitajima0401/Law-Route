import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { jwtVerify } from "jose";
import { toast } from "react-toastify";

const useAuth = () => {
  const [loginUserEmail, setLoginUserEmail] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathName = usePathname()

  useEffect(()=>{
    const checkToken = async() => {
      const token = localStorage.getItem("token")

      console.log("localStorageから取得したtoken:", token)
      console.log("tokenの型:", typeof token)
      console.log("tokenの長さ:", token?.length)
      console.log("ドットの数（パート数）:", token?.split('.').length)


      if(!token){
        if(pathName === "/mypage"){
          router.push("/login")
          toast.success("ログインして、マイページを作成しましょう",{
            toastId: "redirect-mypage-login",
          })
        }
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
        if(pathName === "/mypage"){
          router.push("/login")
        }
        setIsLoading(false)
      }

    }

    checkToken()
  },[pathName, router])

  const logout = () =>{
    localStorage.removeItem("token");
    setLoginUserEmail("")
    setIsLoading(false)
    router.push("/")
  }


  return {loginUserEmail, isLoading, logout}
}

export default useAuth