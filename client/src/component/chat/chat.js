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
import Grow from "@mui/material/Grow";
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
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [welcomeText, setWelcomeText] = useState("");
  console.log(message);
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    setName(urlParams.get("name"));
    setRoom(urlParams.get("room"));
  }, [ENDPOINT, queryString]);

  function sendMessage() {
    setMessages([...messages,message]);
    console.log(messages);
  }

  return (
    <>
      <Paper className="mainScreen" elevation={1}>
        <Typography variant="h5" className="title">
          M.E.R.N. Chat
        </Typography>
        <Typography variant="h6" className="title" mt={1}>
          <b>{room}</b>
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
                  <b>{name}</b>
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
                  Messages:
                </Typography>
              </Paper>
              <Paper elevation={4} className="texts">
                  {messages.map((message) => {
                    return (
                      <Typography variant="h6" m={0.1} className="text">
                        {message}
                      </Typography>
                    );
                  })}
              </Paper>
            </Container>
          </Grid>
        </Grid>
        <Grid container maxWidth="sm" className="typeScreen" spacing={1}>
          <Grid item xs={8}>
            <TextField
              className="textField"
              id="outlined-search"
              label="Text Here..."
              type="search"
              multiline
              autoComplete="false"
              fullWidth
              onChange={(e) => setMessage(e.target.value)}
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
              onClick={(e) => {
                sendMessage();
              }}
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
