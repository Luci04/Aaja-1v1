//Import Statements
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Server } from "socket.io";
import { v4 as uuidv4 } from 'uuid';


//Additional Config
const roomSize = 2;
dotenv.config();
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
let room = []
let userinroom = []

io.on('connection', async (socket) => {
    console.log('a user connected', socket.id);

    console.log("A new User Joined")

    socket.on('joined_room', roomId => {
        socket.join(roomId);
    });

    socket.on("join_room", (anotherSocketId) => {
        const clientsInRoom = io.sockets.adapter.rooms[anotherSocketId];
        const numClients = clientsInRoom ? clientsInRoom.length : 0;

        if (numClients === roomSize) {
            socket.emit('full', 'Room is full.');
        } else {
            socket.join(anotherSocketId);
            socket.emit('joined', (anotherSocketId) => {
                socket.emit('')
            });
        }

        socket.join(anotherSocketId);
    });

    socket.on('alluser', (e) => {
        console.log("pram", e)

    })

    socket.on('disconnect', () => {

    })

});


server.listen(PORT, () => {
    console.log(`listening on :${PORT}`);
});
