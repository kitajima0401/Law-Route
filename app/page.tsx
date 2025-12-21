"use client"
import { useState } from "react"
import Results from "./components/Results"
import SearchForm from "./components/forms/SearchForm"
import { toast } from "react-toastify"
import LawMenu from "./components/Lawmenu"
import { Box, Container, Typography } from "@mui/material"

const Homepage = () => {
  const [keyword, setKeyword] = useState<string>("")
  const [results, setResults] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSearch = async (searchKeyword: string)=>{
    setIsLoading(true);
    setResults(null);
    setKeyword(searchKeyword)
    try{
      const res = await fetch("/api/getSearchResults",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({keyword: searchKeyword})
      })
      const jsonData = await res.json()
      if (!res.ok){
        throw new Error(jsonData.message)
      }
      console.log(jsonData)
      setResults(jsonData.data)
    }catch(err: any){
      toast.error(err.message)
    }finally{
      setIsLoading(false)
    }
  }

  return(
    <Box sx={{minHeight:"100vh", bgcolor:"gray.50"}}>
      <Container maxWidth="lg" sx={{py:{xs:6, md:12}}}>
        <Typography variant="h3" fontWeight="bold" align="center" color="text.primary" gutterBottom>
          Law Route
        </Typography>
        <LawMenu/>
        <Typography variant="h6" align="center" color="text.secondary" sx={{mt:2, mb:8}}>
          キーワードを入力して、法令を検索できます
        </Typography>
        <SearchForm onSearch={handleSearch} isLoading={isLoading}/>
        <Results results={results?.items ?? []} keyword={keyword} isLoading={isLoading}/>
      </Container>
    </Box>
  )
}

export default Homepage