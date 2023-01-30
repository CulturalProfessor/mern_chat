import React from "react";
import { useState, useEffect } from "react";
import queryString from "query-string";
import axios from "axios";
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

const ENDPOINT = "localhost:3000";

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
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [welcomeText, setWelcomeText] = useState("");
  const [users, setUsers] = useState([]);
  console.log(message);

  useEffect(() => {
    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    setName(urlParams.get("name"));
    setRoom(urlParams.get("room"));

    const data = {
      name: name,
      room: room,
    };
    function getUsers(){
    axios
      .post("http://localhost:5000/getUsers", data)
      .then((res) => {
        setUsers(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    function getMessages(){
    axios
      .post("http://localhost:5000/getMessages", data)
      .then((res) => {

        let textArray=[];
        for(let i=0;i<res.data.length;i++){
          textArray.push(res.data[i].text);          
        }
        console.log(textArray);
        messages.push(...textArray)
      })
      .catch((err) => {  
        console.log(err);       
      });
    } 
    //don't disturb this sequence of function,it is important
    getMessages();
    getUsers(); 
  }, [ENDPOINT, queryString,messages]);
      
  useEffect(()=>{
    
  },[])   

  function sendMessage() {
    setMessages([...messages, message]);
    // console.log(messages);
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
          <Grid item xs={4} direction="column">
            <Grid item xs={8}>
              <Container className="activeUsersScreen">
                <Paper elevation={4} className="item">
                  <Typography variant="h6" className="title">
                    Active Users
                  </Typography>
                </Paper>
                <Paper elevation={4} className="activeUsersList">
                  <b>
                    <Typography className="username">users</Typography>
                  </b>
                  <Typography variant="h6" className="username"></Typography>
                </Paper>
              </Container>
            </Grid>
            <Grid item xs={4}>
              <Container className="usersScreen">
                <Paper elevation={4} className="item">
                  <Typography variant="h6" className="title">
                    Members
                  </Typography>
                </Paper>
                <Paper elevation={4} className="usersList">
                  <b>
                    {users.map((user) => {
                      return (
                        <Typography variant="h6" m={0.1} className="username">
                          {user}
                        </Typography>
                      );
                    })}
                  </b>
                  <Typography variant="h6" className="username"></Typography>
                </Paper>
              </Container>
            </Grid>
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
