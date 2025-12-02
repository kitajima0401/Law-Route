import { useEffect, useState } from "react"

type Props = {
  law_id: string
}
const LawDetails = ({law_id}: Props) => {
  const [data, setData] = useState(null)
  useEffect(()=>{
    const getFullText = async() => {
      try{
        if(!law_id) return null
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/getFullText`,{
          method: "POST",
          body: JSON.stringify({ law_id }),
          headers: { "Content-Type": "application/json" }
        }
        )
        const data = await response.json()
        console.log(data)
        setData(data)
      }catch(err){
        return console.log("データ取得失敗")
      }
    }
    getFullText()
  },[law_id])
  
  if(!data){
    return null
  }else{
    return(
      <div>
        {data.revision_info.amendment_law_title}
      </div>
    )
  }
}

export default LawDetails