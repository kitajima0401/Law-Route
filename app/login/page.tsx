"use client"
import LoginForm from "../components/forms/LoginForm"

const Login = () => {

  return(
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200"> 
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">ログイン</h1>
          <LoginForm/>
        </div>
      </div>
    </div>
    
  )
}

export default Login