import React, { useEffect, useState } from "react";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeroScreen from "./components/HeroSceen";
import "./index.css";

import io from "socket.io-client";
import Context, { userinfo } from "./Context";
import { useContext } from "react";

export const socket = io(`http://localhost:5000/`);

function App() {

  const { user, setUser } = useContext(userinfo)


  const [isConnected, setIsConnected] = useState(socket.connected);
  const [userName, setUserName] = useState(null);
  const [roomId, setRoomId] = useState(null);



  useEffect(async () => {
    // setUser("jkasdhjkfh")
    // console.log("app user",user)
    socket.on("connect", async () => {
      console.log("socket connected");
      socket.emit("join_room", 1)
    });

    socket.on('Joined_room', (data) => {
      console.log("Nebie")
      console.log(data);
    })

    socket.on('full', (data) => {
      console.log("Room is Full Fuck off MF!!")
    })

    return () => {
      socket.off("connect");
    };
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <HeroScreen
                setRoomId={setRoomId}
                roomId={roomId}
                socket={socket}
              />
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
    <Context>
      <App />
    </Context>
  )
}

export default ContextwrapperApp;
