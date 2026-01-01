"use client"
import {  Typography,  Button,  AppBar, Toolbar } from "@mui/material"
import useAuth from "../api/utils/useAuth"

const Header = () => {
  const {loginUserEmail, logout} = useAuth()
  return(
    <AppBar position="fixed" color="default" >
      <Toolbar>
        <Typography component="a" variant="h6" href="/" flexGrow={1} color="default">
          LawRoute
        </Typography>
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