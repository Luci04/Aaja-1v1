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

//Server Listen

io.on('connection', (socket) => {

    console.log('A new User Connected', socket.id)

    socket.join('room1');

    let size = io.sockets.adapter.rooms.get('room1').size;

    if (size == 3) {
        const userSocket = io.sockets.sockets.get(socket.id);

        // Remove the user from the room
        if (userSocket) {
            userSocket.leave('room1');
            socket.emit('room_full');
        }
    } else if (size == 1) {
        socket.emit('waiting_for');
    } else {
        const rand = Math.floor(Math.random() * question_list.length);

        socket.to('room1').emit('start', { question: question_list[rand] });
    }

    socket.on('disconnect', (user) => {
        console.log("Disconnted User")
    })

});


server.listen(PORT, () => {
    console.log(`listening on :${PORT}`);
});
