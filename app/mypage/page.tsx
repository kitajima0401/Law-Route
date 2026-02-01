"use client"
import useAuth from "@/app/api/utils/useAuth"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Container, Box, Typography, List, ListItem, Button } from "@mui/material"

const Mypage = () => {
  const {loginUserEmail, isLoading} = useAuth()
  const [recent, setRecent] = useState<any>(null)
  const router = useRouter()
  const [bookmarks, setBookmarks] = useState<any[]>([])
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("articleBookmarks") || "[]")
    setBookmarks(data)
  }, [])
  useEffect(() => {
    const data = localStorage.getItem("recentTopic")
    if (data) {
      setRecent(JSON.parse(data))
    }
  }, [])
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
  

  const removeBookmark = (bmToRemove: any) => {
    const updated = bookmarks.filter( (b) => !( b.law === bmToRemove.law && b.topic === bmToRemove.topic && b.num === bmToRemove.num && b.revision === bmToRemove.revision ) )
    setBookmarks(updated)
    localStorage.setItem("articleBookmarks", JSON.stringify(updated))
  }
  
  return(
    <Container maxWidth="sm" sx={{py: 12}}>
      <Box mt={4} textAlign="center">
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4} color="primary.main">
          ようこそ、 {loginUserEmail} さん
        </Typography>

        {!recent?(
          <Typography>最近読んだトピックはありません</Typography>
        ):(
          <Box> 
            <Typography variant="h6" sx={{ mb: 2 }}> 最近読んだトピック </Typography> 
            <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: 2 }}> 
              <Typography>法令：{recent.law}</Typography>
              <Typography>トピック：{recent.topic}</Typography>
              <Typography sx={{ fontSize: 12, color: "gray" }}> {new Date(recent.timestamp).toLocaleString()} </Typography> 
              <Button variant="contained" sx={{ mt: 2 }} 
                onClick={() => {
                  router.push( `../topic?law=${encodeURIComponent(recent.law)}&topic=${encodeURIComponent(recent.topic)}&revision=${recent.revision}` ) 
                }} 
              >
                開く 
              </Button>
            </Box> 
          </Box>
        )} 

        <Typography variant="h6" sx={{ mb: 2 }}>
          ブックマークした条文：{bookmarks.length}件
        </Typography>
        {bookmarks.length===0&&(
          <Typography>ブックマークした条文はありません</Typography>
        )}
        {bookmarks.length>0&&(
           <List>
           {bookmarks.map((bm, idx) => (
             <ListItem key={idx} sx={{ borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between", }} >
               <Box>
                 <Typography sx={{ fontWeight: "bold" }}>
                   {bm.law} / {bm.topic}
                 </Typography>
                 <Typography sx={{ fontSize: 14, color: "gray" }}>
                   第{bm.num}条
                 </Typography>
                 <Typography sx={{ fontSize: 12, color: "gray" }}>
                   {new Date(bm.timestamp).toLocaleString()}
                 </Typography>
               </Box>
               <Box sx={{ display: "flex", gap: 1 }}>
                <Button variant="outlined" onClick={() => {
                    router.push(
                      `../topic?law=${encodeURIComponent(
                        bm.law
                      )}&topic=${encodeURIComponent(
                        bm.topic
                      )}&revision=${bm.revision}`
                    )
                  }}
                >
                  開く
                </Button>
                <Button variant="outlined" color="error" onClick={() => removeBookmark(bm)}
                  >
                    削除
                  </Button>
                </Box>
             </ListItem>
           ))}
         </List>
        )}

      </Box>
    </Container>
    
  )
}

export default Mypage
