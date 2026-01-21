"use client"
import useAuth from "@/app/api/utils/useAuth"
import { Container, Box, Typography, List, ListItem } from "@mui/material"

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
    <Container maxWidth="sm" sx={{py: 8}}>
      <Box mt={4} textAlign="center">
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4} color="primary.main">
          ようこそ、 {loginUserEmail} さん
        </Typography>
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
