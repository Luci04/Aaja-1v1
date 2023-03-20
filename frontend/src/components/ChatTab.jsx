import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { socket } from '../App'
import { userContext } from '../UserProvider'


const ChatTab = () => {
  const {id}  = useParams()
  const [message, setMessage] = useState("")
  const [allMessage, setallMessage] = useState([])
    const {user} = useContext(userContext)
  useEffect(()=>{
    socket.on('message',(reciverd_message)=>{
      setallMessage([...allMessage,reciverd_message])
    })

  },[allMessage])
  const sendMessage = (e)=>{
      e.preventDefault()
    const message_details = {
      message:message,
      pic:user.pic
    }
    socket.emit("send_message",message_details)
    setMessage("")
  }
  return (
    <div className='bg-[#1e1e1e] h-full'>
      <div className=' bg-[#252526] p-1'>
         ChatTab
      </div>
      <div className='overflow-y-auto h-[85%]'>
        {allMessage.map((mess,index)=>{
            return(
              <div className='flex gap-4' key={index}>
                  <img src={mess.dp} alt="mic" className='w-[2rem] h-[2rem]' />
                  <p>{mess.text}</p>
              </div>
            )
        })}
      </div>
      <div>

      {/* <label for="text" class=" text-sm font-medium text-gray-900 sr-only dark:text-white">Type Here...</label> */}
      <form onSubmit={sendMessage} id='form'>

    <div class="relative">
        <input type="text" id="text" onChange={(e)=>{setMessage(e.target.value)}} value={message} class="block w-full p-4 text-sm text-white bg-[#2b2a2a]   focus:outline-none " placeholder="Type Here.. "  />
        <button id='submit' type='submit' class="text-white absolute right-2.5 bottom-2.5 bg-[#0c4e95] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 ">send</button>
    </div>
      </form>


      </div>
    </div>
  )
}

export default ChatTab