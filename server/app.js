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
    console.log("A user connected",socket.id);
    // console.log("Socket ID:", );
    // socket.emit("message", `Hello from server!`);
    // socket.broadcast.emit("message", `${socket.id} has joined the chat`);

    socket.on("message", (data) => {
        console.log(data);
        socket.broadcast.emit("recieve-message", data);
      }
      )

    socket.on("disconnect", () => {
        console.log("A user disconnected",  socket.id);
    });

})

server.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})