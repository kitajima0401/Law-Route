"use client"

import { useState } from "react"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    try{
      const response = await fetch("http://localhost:3000/api/user/login",{
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
    <div>
      <title>ログインページ</title>
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit}>
        <input value={email} placeholder="メールアドレス" onChange={(e)=>setEmail(e.target.value)} type="email" required/>
        <input value={password} placeholder="パスワード" onChange={(e)=>setPassword(e.target.value)} type="password" required/>
        <button>ログイン</button>
      </form>
    </div>
  )
}

export default Login