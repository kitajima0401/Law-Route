"use client"
import { useState } from "react"


const lawItems = [
  {
    title: '民法',
    items: ['民法総則', '物権', '債権総論', '債権各論', '親族・相続'],
  },
  {
    title: '刑法',
    items: ['刑法総論', '刑法各論'],
  },
  {
    title: '憲法',
    items: ['基本原理・総論', '人権', '統治機構'],
  },
  {
    title: '商法',
    items: ['商法総論・商行為法', '会社法', '手形法・小切手法'],
  },
  {
    title: '民事訴訟法',
    items: ['基本原則', '訴訟の開始', '当事者論', '審理・証拠', '判決・上訴'],
  },
  {
    title: '刑事訴訟法',
    items: ['基本原則', '捜査', '公訴の提起', '公判手続・証拠法', '裁判・上訴'],
  },
]

const AccordionItem = ({subject}) => {
  const [isOpen, setIsOpen] = useState(false)
  return(
    <div className="border-b border-gray-700">
      <button className="flex justify-between items-center w-full p-4 text-left bg-white hover:bg-gray-700 hover:text-white focus:outline-none" type="submit" onClick={()=>setIsOpen(!isOpen)}>{subject.title}</button>
      {isOpen && 
        <div className="p-4 bg-gray-900">
          <ul className="space-y-2">{subject.items.map((item, index)=>(
            <li key={index} className="text-white hover:text-white cursor-pointer transition duration-150">
              {item}
            </li>
          ))}</ul>
        </div>
      }
    </div>
  )
}

const Sidebar = () => {
  return(
    <div className="w-64 bg-gtay-800 h-screen fixed overflow-y-auto pt-8">
      <div className="p-4 text-xl font-bold text-white border-b border-gray-700">
        司法試験学習メニュー
      </div>
      <div>
        {lawItems.map((subject)=>(
          <AccordionItem key={subject.title} subject={subject}/>
        ))}
      </div>
    </div>
  )
}

export default Sidebar