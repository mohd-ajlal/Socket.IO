import { Button, Container, TextField, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react'
import {io} from 'socket.io-client'

const App = () => {

  const socket = useMemo(()=>io("http://localhost:3000"),[]);

  const [message, setMessage] = useState("");

  const handleSubmit = (e) =>{
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");

  }

  useEffect(() => {
    socket.on("connect",()=>{
      console.log("Connected to server", socket.id);
      // console.log("Socket ID:", );

    })


    socket.on("recieve-message", (data) => {
      console.log(data);
    }
    )

    socket.on("welcome", (data) => {
      console.log("Message from server:", data);
    }
    )

    return () => {
      socket.disconnect();
      // console.log("Disconnected from server");
    }

  }, [])
  

  return (
    <Container maxWidth="sm">
      <Typography
        variant="h1"
        component="div"
        gutterBottom
      >
        Welcome to Socket.io with React
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color='primary'
        >Send</Button>
      </form>
    </Container>
  )
}

export default App