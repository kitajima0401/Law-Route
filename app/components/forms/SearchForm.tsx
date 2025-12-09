"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SearchSchema, searchSchema } from "@/app/lib/validation/searchSchema"

interface FormProps {
  onSearch: (keyword: string) => Promise<void>,
  isLoading: boolean
}

export default function SearchForm({onSearch, isLoading}: FormProps){

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<SearchSchema>({
    resolver: zodResolver(searchSchema)
  })

  const onSubmit = async(data: SearchSchema) => {
    await onSearch(data.keyword)
  }

  return(
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-sm mx-auto">
      <div>
        <input {...register("keyword")} placeholder="キーワードを入力してください" className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-700"  disabled={isLoading}/>
        {errors.keyword&&<p className="text-red-500 text-sm mt-1">{errors.keyword.message}</p>}
      </div>
      <button type="submit" disabled={isLoading} className="px-10 py-4 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 active:bg-blue-900 transition shadow-md whitespace-nowrap">
        {isLoading?"検索中...":"検索"}
      </button>
    </form>
  )
}