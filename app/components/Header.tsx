"use client"
import {  Typography,  Button,  AppBar, Toolbar } from "@mui/material"
import useAuth from "../api/utils/useAuth"
import { usePathname } from "next/navigation"

const Header = () => {
  const {loginUserEmail, logout} = useAuth()
  const pathName = usePathname()
  return(
    <AppBar position="fixed" color="default" >
      <Toolbar>
        
        {pathName === "/mypage"?(
          <Typography component="a" variant="h6" href="/" flexGrow={1} color="default">
            LawRoute/mypage
          </Typography>
        ):(
          <Typography component="a" variant="h6" href="/" flexGrow={1} color="default">
            LawRoute
          </Typography>
        )}
        {!loginUserEmail?(
          <>
            <Button color="inherit" href="/login">
              ログイン
            </Button>
            <Button color="inherit" href="/register">
              新規登録
            </Button>
          </>
        ):(
          <Button color="inherit" onClick={logout}>
            ログアウト
          </Button>
        )

        }
        
        <Button variant="contained" color="primary" href="/mypage">
          マイページ
        </Button>
      </Toolbar>
    </AppBar>
  )
  
}

export default Header