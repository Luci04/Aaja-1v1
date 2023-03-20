import React, { useEffect, useState } from "react";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import "./index.css";

import io from "socket.io-client";
import UserProvider from "./UserProvider";





export const socket = io(`http://localhost:5000/`);
 
function App() {
  
  



  const [isConnected, setIsConnected] = useState(socket.connected);
  const [userName, setUserName] = useState(null);
  const [roomId, setRoomId] = useState(null);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Login />
            }
          />
          <Route path="/:id" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

const ContextwrapperApp = () => {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  )
}

export default ContextwrapperApp;
