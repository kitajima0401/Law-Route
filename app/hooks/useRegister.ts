import { useRouter } from 'next/navigation';
import { useMutation } from "@tanstack/react-query"
import { RegisterSchema } from '../lib/validation/registerSchema';
import api from "@/app/lib/axios"
import { toast } from 'react-toastify';



export const useRegister = () =>{
  const router = useRouter()
  return useMutation({
    mutationFn:(data: RegisterSchema)=>{
      return api.post("/api/user/register", data)
    },
    onSuccess:(res)=>{
      toast.success(res.data.message)
      router.push("/login")
    },
    onError:(error: any)=>{
      toast.error(error.response?.data?.message)
    }
  })
}
