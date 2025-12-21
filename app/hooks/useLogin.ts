import { useRouter } from 'next/navigation';
import { useMutation } from "@tanstack/react-query"
import { LoginSchema } from '../lib/validation/loginSchema';
import api from "@/app/lib/axios"
import { toast } from 'react-toastify';



export const useLogin = () =>{
  const router = useRouter()
  return useMutation({
    mutationFn:(data: LoginSchema)=>{
      return api.post("/api/user/login", data)
    },
    onSuccess:(res)=>{
      localStorage.setItem("token", res.data.token)
      toast.success(res.data.message)
      router.push("/mypage")
    },
    onError:(error: any)=>{
      toast.error(error.response?.data?.message)
    }
  })
}
