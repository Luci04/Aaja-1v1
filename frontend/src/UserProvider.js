import React, { createContext, useState } from 'react'
import io from "socket.io-client";
export const userContext = createContext()
const UserProvider = ({children}) => {
    
    const [user,setuser] = useState({})

  return (
    <userContext.Provider value={{user ,setuser}}>{children}</userContext.Provider>
  )
}

export default UserProvider