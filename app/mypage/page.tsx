"use client"

import useAuth from "../api/utils/useAuth"

const Mypage = () => {
  const userEmail  = useAuth()

  if(!userEmail){
    return alert("ログインしてください")
  }
  
  return(
    <div>
      <div>
        <div>
          <h1>マイページ</h1>
        </div>
      </div>
    </div>
  )
}

export default Mypage
