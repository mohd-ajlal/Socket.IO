import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

const App = () => {
  const socket = useMemo(() => io("http://localhost:3000",
    {
      withCredentials: true,
    }
  ), []);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketId, setSocketId] = useState("");
  const [roomName, setRoomName] = useState("");

  // console.log(messages);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", {message, room});
    setMessage("");
  };

  const joinRoomHandler = (e) => {
    e.preventDefault();
    socket.emit("join-room", roomName);
    setRoomName("");
  }

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("Connected to server", socket.id);
      // console.log("Socket ID:", );
    });

    socket.on("recieve-message", (data) => {
      console.log(data);
      setMessages((prev) => [...prev, data]);
    });

    socket.on("welcome", (data) => {
      console.log("Message from server:", data);
    });

    return () => {
      socket.disconnect();
      // console.log("Disconnected from server");
    };
  }, []);

  return (
    <Container maxWidth="sm">
      <Box sx={{height:200}}/>
      <h1>Socket.io with React</h1>

      <Typography variant="h5" component="div" gutterBottom>
        {socketId}
      </Typography>

      <form onSubmit={joinRoomHandler}>
        <h5>Join Room</h5>
        <TextField
          id="outlined-basic"
          label="Room Name"
          variant="outlined"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />

<Button type="submit" variant="contained" color="primary">
          Join Room
        </Button>
      </form>

      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="Message"
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <TextField
          id="outlined-basic"
          label="Room"
          variant="outlined"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />

        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>

      <Stack>
        {
          messages.map((message, index) => (
            <Typography key={index} variant="h6" component="div" gutterBottom>
              {message}
            </Typography>
          ))
        }
      </Stack>
    </Container>
  );
};

export default App;
