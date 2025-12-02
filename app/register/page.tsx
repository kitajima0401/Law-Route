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
    <div className="pt-8 bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <title>登録ページ</title>
        <h1>ユーザー登録</h1>
        <form onSubmit={handleSubmit} >
          <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="ユーザーネーム"  required/>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="メールアドレス"  required/>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="パスワード"  required/>
          <button>登録</button>
        </form>
      </div>
    </div>
  )
}

export default Register