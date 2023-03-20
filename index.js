//Import Statements
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Server } from "socket.io";
import { v4 as uuidv4 } from 'uuid';

import { question_list } from './question.js'


//Additional Config
dotenv.config();
const roomSize = 2;
const PORT = process.env.PORT;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});


app.use(cors());

//Main Routes
app.get("/", (req, res) => {
    res.send("Sever is Working")
})

app.get('/create_room', (req, res) => {
    const currId = uuidv4();
    res.send({ roomId: currId });
})

let users =[]
//Server Listen

io.on('connection', (socket) => {

    console.log('A new User Connected', socket.id)
    socket.on("join_room",(data)=>{
        let userinfo ={
            username: data.username,
            id: socket.id,
            pic:data.pic
        }
        users.push(userinfo)
        socket.join("public_room")
    })

    socket.on("connected_user",()=>{
        io.emit('user' , users)
    })

    socket.on("send_message",({message, pic})=>{
        console.log(message)
            io.emit("message",{
                text:message,
                dp:pic
            })
    })

    

    socket.on('disconnect', (u) => {
        console.log("Disconnted User",socket.id)
        users = users.filter((user)=>{
            return !(user.id === socket.id);
        })
        io.emit('user' , users) 
        console.log("new user",users)
    })

});


server.listen(PORT, () => {
    console.log(`listening on :${PORT}`);
});
