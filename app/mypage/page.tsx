"use client"
import useAuth from "@/app/api/utils/useAuth"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Container, Box, Typography, List, ListItem, Button } from "@mui/material"

const Mypage = () => {
  const {loginUserEmail, isLoading} = useAuth()
  const [recent, setRecent] = useState<any>(null)
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
  

  const router = useRouter()
  
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

        <List>
          <ListItem sx={{ position: 'relative', bgcolor: 'background.paper', borderRadius: 2, mb: 1 }}>
            {/* お気に入り登録した法令IDをfetchしたい
            schemaにrevision_idを入れたい。 */}
            あなたの登録した法令：
          </ListItem>
        </List>
      </Box>
    </Container>
    
  )
}

export default Mypage
