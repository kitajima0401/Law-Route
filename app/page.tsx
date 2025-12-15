"use client"
import { useState } from "react"
import Results from "./components/Results"
import SearchForm from "./components/forms/SearchForm"
import { toast } from "react-toastify"
import LawMenu from "./components/Lawmenu"

const Homepage = () => {
  const [keyword, setKeyword] = useState<string>("")
  const [results, setResults] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSearch = async (searchKeyword: string)=>{
    setIsLoading(true);
    setResults(null);
    setKeyword(searchKeyword)
    try{
      const res = await fetch("/api/getSearchResults",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({keyword: searchKeyword})
      })
      const jsonData = await res.json()
      if (!res.ok){
        throw new Error(jsonData.message)
      }
      console.log(jsonData)
      setResults(jsonData.data)
      toast.success("検索成功")
    }catch(err: any){
      toast.error(err.message)
    }finally{
      setIsLoading(false)
    }
  }

  return(
      <div className="min-h-screen bg-gray-50 pt-8">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">Law Route</h1>
          <LawMenu/>
          <br/>
          <p className="text-lg text-gray-600 text-center mb-10">キーワードを入力して、法令を検索できます。</p>
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />
          <Results results={results?.items ?? []} keyword={keyword} isLoading={isLoading} />
        </div>
      </div>
  )
}

export default Homepage