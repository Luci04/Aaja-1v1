import React ,{ useState , useEffect}from 'react'
import { socket } from '../App'





const UserTab = () => {
    const [onlineuser, setonlineuser] = useState([])
  useEffect(() => {
    socket.emit('connected_user')
    socket.on("user",(data)=>{
      setonlineuser(...onlineuser,data)

    })

  }, [socket])
  
  return (
    <div className='text-center w-full' >
      <div className=' bg-black p-1'>
        <h1>Connected Users</h1>
      </div>
        <div className=' p-2 flex gap-4'>
          {onlineuser.map(({username , pic})=>{
          return(
            <div className=' w-fit'>
                <img src={pic} alt="dp" className=' w-[4rem] h-[4rem] rounded-full' />
                <h4>
                {username}
                </h4>
            </div>
          )
        })}</div>
    </div>
  )
}

export default UserTab