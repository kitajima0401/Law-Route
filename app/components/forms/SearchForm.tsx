"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SearchSchema, searchSchema } from "@/app/lib/validation/searchSchema"
import { Box, Typography, Container, Button, TextField } from "@mui/material"

interface FormProps {
  onSearch: (keyword: string) => Promise<void>,
  isLoading: boolean
}

export default function SearchForm({onSearch, isLoading}: FormProps){

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<SearchSchema>({
    resolver: zodResolver(searchSchema)
  })

  const onSubmit = async(data: SearchSchema) => {
    await onSearch(data.keyword)
  }

  return(
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)} 
        sx={{
          display: "flex",
          flexDirection: "column",
          gap:3,
          mt:4,
        }}
      >
        <TextField 
          {...register("keyword")} 
          placeholder="キーワードを入力してください"   
          disabled={isLoading}
          variant="outlined"
          fullWidth
          error={!!errors.keyword}
          helperText={errors.keyword?.message}
          sx={{bgcolor: 'background.paper'}}
        />
        <Button 
          type="submit" 
          variant="contained"
          color="primary"
          size="large"
          disabled={isLoading}
          sx={{
            py: 1.5,
            fontWeight: "medium",
            boxShadow: 3,
            "&:hover":{boxShadow:6}
          }}
        >
          {isLoading?"検索中...":"検索"}
        </Button>
      </Box>
    </Container>
  )
}