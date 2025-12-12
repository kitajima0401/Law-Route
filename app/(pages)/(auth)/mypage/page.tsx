"use client"
import useAuth from "@/app/api/utils/useAuth"

const Mypage = () => {
  const {loginUserEmail, isLoading} = useAuth()
  if(isLoading){
    return(
      <div className="pt-8">認証中...</div>
    )
  }
  if(!loginUserEmail){
    return(
      <div className="pt-8">認証中...</div>
    )
  }
  return(
    <div>
      <div>
        <div className="p-8">
          <h1>マイページ</h1>
          <h2>ようこそ、 {loginUserEmail} さん</h2>
        </div>
      </div>
    </div>
  )
}

export default Mypage
