"use client"
import LawDetails from "@/app/components/LawDetails";
import {use} from "react"
import { Typography, Link, Container, Box } from "@mui/material";


export default function LawDetailPage({params}: {params: Promise<{id: string}>}){
  const { id } = use(params)
  return(
    <Box sx={{minHeight:'100vh', bgcolor:'gray.50'}}>
      <Container maxWidth="lg" sx={{py:12, px:{xs:4, sm:6}}} >
        <Link href="/" 
          sx={{
            display:"inline-flex",
            alignItems: "center",
            color: "primary.main",
            textDecoration: "none",
            mb: 6,
            "&:hover":{
              textDecoration:"underline"
            }
          }}>
            <Typography variant="body1">
              ←検索画面に戻る
            </Typography>
          </Link>
        <LawDetails law_revision_id={id}/>
      </Container>
    </Box>
    
  )
}