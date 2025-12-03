"use client"

import { useState } from "react"

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    try{
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/register`,{
        method: "POST",
        headers: { 
          "Accept": "application/json", 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
      })
      const jsonData = await response.json()
      alert(jsonData.message)
    }catch(err){
      alert("ユーザー登録失敗")
    }
  }

  return(
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">

          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">ユーザー登録</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="ユーザーネーム"  required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"/>

            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="メールアドレス"  required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"/>

            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="パスワード"  required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"/>

            <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200">登録</button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Register