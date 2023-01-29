import React from "react";
import { useState, useEffect } from "react";
import queryString from "query-string";
import {
  Box,
  Grid,
  Item,
  Typography,
  Container,
  TextField,
  Button,
  Paper,
  Card,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import InputAdornment from "@mui/material/InputAdornment";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import io from "socket.io-client";
import moment from "moment";
import "./chat.css";

const ENDPOINT = "localhost:5000";

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

function getUser() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const name = urlParams.get("name");
  const room = urlParams.get("room");
  socket.emit("join", { name, room }, (error) => {
    if (error) {
      alert(error);
    }
  });
}

async function userJoined() {
  let welcomeText;
  getUser();
  socket.on("message", (user, text) => {
    // console.log(user.user);
    // console.log(user.text);
    welcomeText = user.text;
    return welcomeText;
  });
}

function Chat() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [welcomeText, setWelcomeText] = useState("");

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    setName(urlParams.get("name"));
    setRoom(urlParams.get("room"));

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
      time: moment().format("MMMM Do YYYY, h:mm:ss a"),
    });
  }

  return (
    <>
      <Paper className="mainScreen" elevation={1}>
        <Typography variant="h4" className="title">
          M.E.R.N. Chat
        </Typography>
        <Typography variant="h5" className="title">
          ROOM
        </Typography>
        <Grid container maxWidth="lg" className="chatScreen">
          <Grid item xs={4}>
            <Container className="usersScreen">
              <Paper elevation={4} className="item">
                <Typography variant="h6" className="title">
                  Active Users
                </Typography>
              </Paper>
              <Paper elevation={4} className="item">
                <Typography variant="h6" className="username">
                  user1
                </Typography>
                <Typography variant="h6" className="username">
                  user2
                </Typography>
              </Paper>
            </Container>
          </Grid>
          <Grid item xs={8}>
            <Container className="textScreen">
              <Paper elevation={4} className="item">
                <Typography variant="h6" className="title">
                  Messages
                </Typography>
              </Paper>
              <Paper elevation={4} className="item">
                <Typography variant="h6" className="texts">
                  message
                </Typography>
                <Typography variant="h6" className="texts">
                  message
                </Typography>
              </Paper>
            </Container>
          </Grid>
        </Grid>
        <Grid container maxWidth="sm" className="typeScreen" spacing={1}>
          <Grid item xs={8}>
            <TextField
              id="outlined-search"
              label="Text Here..."
              type="search"
              multiline
              fullWidth
              color="success"
              maxRows={2}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              className="sendButton"
              focusRipple
              color="success"
              variant="contained"
              endIcon={<SendIcon />}
            >
              send
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default Chat;
