"use client"

import { useState } from "react"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    try{
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/login`,{
        method: "POST",
        headers: { 
          "Accept": "application/json", 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
      const jsonData = await response.json()
      localStorage.setItem("token",jsonData.token)
      alert(jsonData.message)
    }catch(err){
      alert("ログイン失敗")
    }
    
  }

  return(
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200"> 

          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">ログイン</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input value={email} placeholder="メールアドレス" onChange={(e)=>setEmail(e.target.value)} type="email" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"/>

            <input value={password} placeholder="パスワード" onChange={(e)=>setPassword(e.target.value)} type="password" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"/>
            
            <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200">ログイン</button>
          </form>
        </div>
      </div>
    </div>
    
  )
}

export default Login