import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import cors from 'cors';

const app = express();
const PORT = 3000;


const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
}));

app.get("/", (req, res)=>{
    res.send("Hello World!");
})


io.on("connection",(socket)=>{
    console.log("A user connected");
    console.log("Socket ID:", socket.id);
})

server.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})