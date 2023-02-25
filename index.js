//Import Statements
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Server } from "socket.io";
import { v4 as uuidv4 } from 'uuid';


//Additional Config
dotenv.config();
const roomSize = 3;
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

io.on('connection', (socket) => {

    console.log('a user connected', socket.id);
    const numClients = socket.client.conn.server.clientsCount;
    console.log('num clients connected', numClients);

    socket.on("join_room", () => {

        if (numClients === roomSize) {
            console.log(numClients, "Full")
            socket.disconnect(true);
        }

        socket.emit("Joined_room", 123123);
    });


    socket.on('disconnect', () => {
        console.log('disconnected')
    })

});


server.listen(PORT, () => {
    console.log(`listening on :${PORT}`);
});
