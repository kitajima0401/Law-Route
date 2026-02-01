"use client"
import {  Typography,  Button,  AppBar, Toolbar, IconButton, Drawer, Box, List, ListItem } from "@mui/material"
import useAuth from "../api/utils/useAuth"
import MenuIcon from "@mui/icons-material/Menu";
import {usePathname, useRouter} from "next/navigation"
import { useState, useEffect } from "react"

const Header = () => {
  const {loginUserEmail, logout} = useAuth()
  const pathName = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [bookmarks, setBookmarks] = useState<any[]>([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("articleBookmarks") || "[]")
    setBookmarks(data)
  }, [])
  return(
    <>
      <AppBar position="fixed" color="default" >
        <Toolbar>
          <IconButton onClick={()=>setOpen(!open)} sx={{mr: 2}}>
            <MenuIcon/>
          </IconButton>
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
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 300, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            ブックマークした条文
          </Typography>

          {bookmarks.length === 0 && (
            <Typography sx={{ color: "gray" }}>ブックマークはありません</Typography>
          )}

          {bookmarks.length > 0 && (
            <List>
              {bookmarks.map((bm, idx) => (
                <ListItem key={idx} sx={{ borderBottom: "1px solid #eee", cursor: "pointer" }} onClick={() => {
                    router.push(
                      `/topic?law=${encodeURIComponent(bm.law)}&topic=${encodeURIComponent(bm.topic)}&revision=${bm.revision}`
                    )
                    setOpen(false)
                  }}
                >
                  <Box>
                    <Typography sx={{ fontWeight: "bold" }}>{bm.law}</Typography>
                    <Typography sx={{ fontSize: 14 }}>
                      {bm.topic} / 第{bm.num}条
                    </Typography>
                  </Box>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Drawer>
    </>
  )
  
}

export default Header