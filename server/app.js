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

    socket.on("message", ({room, message}) => {
        console.log({room, message});
        // socket.broadcast.emit("recieve-message", data);
        io.to(room).emit("recieve-message", message);
        // we can also use socket.to(room).emit("recieve-message", message);
      }
      )

    socket.on("disconnect", () => {
        console.log("A user disconnected",  socket.id);
    });

})

server.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})