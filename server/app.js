import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";


const app = express();
const PORT = 3000;
const secretkeyJWT= "gvwvdchjbwcdhj"

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);



app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.get("/login", (req, res) => {
    const token = jwt.sign({_id:"ghwdjsxbhjwedchbjs"},secretkeyJWT)
    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" })
    .json({ message: "Logged in successfully", token });
  });
  
const user = false;

io.use((socket, next)=>{
    cookieParser()(socket.request, socket.request.res, (err) => {
        if(err) return next(err);
        const token = socket.request.cookies.token;

        if(!token) return next(new Error("Authentication error"));

        const decoded = jwt.verify(token, secretkeyJWT)

        next()
    });
})

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
  // console.log("Socket ID:", );
  // socket.emit("message", `Hello from server!`);
  // socket.broadcast.emit("message", `${socket.id} has joined the chat`);

  socket.on("message", ({ room, message }) => {
    console.log({ room, message });
    // socket.broadcast.emit("recieve-message", data);
    socket.to(room).emit("recieve-message", message);
    // we can also use io.to(room).emit("recieve-message", message);
  });

  socket.on("join-room", (room) => {
  socket.join(room);
  console.log(`User joined room ${room}`);
  // Broadcast to others in the room
  socket.to(room).emit("recieve-message", `${socket.id} joined the room`);
});


  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
