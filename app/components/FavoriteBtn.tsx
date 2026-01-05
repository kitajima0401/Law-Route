import useAuth from "../api/utils/useAuth"
import Button from '@mui/material/Button'

const FavoriteBtn = () => {
  const {loginUserEmail} = useAuth()

  const handleSubmit = () => {
    
  }



  if(!loginUserEmail){
    return null
  }
  return(
    <Button variant="text" color="primary">
      お気に入り登録
    </Button>
  )
}

export default FavoriteBtn