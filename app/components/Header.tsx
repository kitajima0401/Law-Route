import {  Typography,  Button,  AppBar, Toolbar } from "@mui/material"

const Header = () => {
  return(
    <AppBar position="fixed" color="default" >
      <Toolbar>
        <Typography component="a" variant="h6" href="/" flexGrow={1} color="default">
          LawRoute
        </Typography>
        <Button color="inherit" href="/login">
          ログイン
        </Button>
        <Button color="inherit" href="/register">
          新規登録
        </Button>
        <Button variant="contained" color="primary" href="/mypage">
          マイページ
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header