"use client"
import { useState } from "react"
import Results from "@/app/components/Results/Results"

const Homepage = () => {
  const [keyword, setKeyword] = useState<string>("")
  const [results, setResults] = useState<any>(null)
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    try{
      const res = await fetch(`https://laws.e-gov.go.jp/api/2/keyword?keyword=${keyword}`)
      const data = await res.json()
      console.log(data)
      setResults(data)
    }catch(err){
      alert("検索に失敗しました")
    }
    
  }
  return(
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">Law Route</h1>
        <p className="text-lg text-gray-600 text-center mb-10">キーワードを入力して、法令を検索できます。</p>
        <form onSubmit={handleSubmit} className="mb-12">
          <div className="flex justify-center gap-4 mb-12">
          <input
            placeholder="検索したい用語を入力してください。例: 個人情報保護"
            value={keyword}
            type="text"
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full max-w-2xl px-6 py-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-700 focus:ring-4 focus:ring-blue-100 transition-shadow placeholder-gray-500"
            required
          />
          <button className="px-10 py-4 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 active:bg-blue-900 transition shadow-md whitespace-nowrap">
            検索
          </button>
        </div>
        </form>
        <Results results={results?.items ?? []} keyword={keyword} />
      </div>
    </div>
  )
}

export default Homepage