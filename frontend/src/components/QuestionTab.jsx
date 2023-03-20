import React, { useContext, useState, useEffect } from 'react'

import { socket } from '../App'




const QuestionTab = () => {

      const [question, setquestion] = useState('asdf')
  useEffect(()=>{
   socket.on("waiting_for",()=>{
    setquestion("waiting for")
    console.log("w8")
   })
  },[socket,socket])


  return (
    <div>QuestionTab
        <dir>{question}</dir>
    </div>
  )
}

export default QuestionTab