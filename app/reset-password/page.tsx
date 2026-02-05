import { Suspense } from "react"
import ResetPasswordPage from "../components/forms/ResetPassword"
const resetPassword =()=>{
    return(
        <Suspense fallback={<div>読み込み中</div>}>
            <ResetPasswordPage/>
        </Suspense>
    )
}

export default resetPassword