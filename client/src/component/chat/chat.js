import React from 'react'
import { useState, useEffect } from "react";
import queryString from "query-string";
import {
  Typography,
  Container,
  TextField,
  Button,
  Paper,
  Card,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import io from "socket.io-client";
import moment from "moment";
import './chat.css'

// const socket = io("http://localhost:5000");
// socket.on("connect", (socket) => {
//   // console.log("socket connected");

// });
// socket.on("getMessage",()=>{
  
// })

const ENDPOINT = "localhost:5000";

//   function getURL(){
//   const queryString = window.location.search;
//   const urlParams = new URLSearchParams(queryString);
//   const user = urlParams.get("name");
//   const room = urlParams.get("room");
//     return ({user,room});
// }

var connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};

const socket = io("http://localhost:5000", connectionOptions);
socket.on("connect", (socket) => {
  console.log("socket connected");
});

function Chat() {

  const [message, setMessage] = useState("");
      const [name, setName] = useState("");
      const [room, setRoom] = useState("");

  useEffect(() => {

    const queryString=window.location.search;
    const urlParams = new URLSearchParams(queryString);
    
    setName(urlParams.get('name'));
    setRoom(urlParams.get('room'));

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
    return () => {
      socket.emit("disconnection");
      socket.off();
    };
  }, [ENDPOINT, queryString]);

  function sendMessage(message) {
    const card = document.getElementById("card");
    const text = document.createElement("p");
    text.innerHTML = message;
    card.appendChild(text);
    text.className = "message";
    socket.emit("sendMessage", {
      user: name,
      room: room,
      text: message,
      time: moment().format("LT"),
    });
  }

  return (
    <Paper variant="outlined" align="center" className="paper">
        <Container className="header">
          <RocketLaunchOutlinedIcon variant="" fontSize="large" />
          <Typography variant="h4">CHAT APP</Typography>
          <Typography variant='h5'>{room}</Typography>
        </Container>
        <Container fixed maxWidth="sm">
          <Card variant="outlined" id="card">
            <p className="message"> {name},your chat begins here</p>
          </Card>
        </Container>
        <Container className="sendMessage">
          <TextField
            className="inputText"
            id="outlined-basic"
            label="Message"
            variant="outlined"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <Button
            className="send"
            variant="contained"
            endIcon={<SendIcon />}
            type="submit"
            onClick={() => {
              sendMessage(message);
              setMessage("");
            }}
          >
            Send
          </Button>
        </Container>
      </Paper>
  )
}

export default Chat