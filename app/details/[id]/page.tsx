type Props = {
  params: {
    id: string
  }
}

const LawDetail = async({ params }: Props) => {
  const law_id = params.id
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getLawDetails`,{
      method: "POST",
      headers: { 
        "Accept": "application/json", 
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        law_id: law_id
      })
    })
  const data = await response.json()
  
  return(
    <div className="pt-8">
      {data.law_info.law_id}
    </div>
  )
}

export default LawDetail