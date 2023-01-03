import "./App.css";
import {
  Typography,
  Container,
  TextField,
  Button,
  Box,
  Paper,
  Card,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import React, { useState } from "react";

function sendMessage(message) {
  const card = document.getElementById("card");
  const text = document.createElement("p");
  text.innerHTML = message;
  card.appendChild(text);
  text.className = "message";
}

function App() {
  const [message, setMessage] = useState("");

  return (
    <>
      <Paper variant="outlined" align="center" className="paper">
        <Container className="header">
          <RocketLaunchOutlinedIcon variant="" fontSize="large" />
          <Typography variant="h4">CHAT APP</Typography>
        </Container>
        <Container fixed maxWidth="sm">
          <Card variant="outlined" id="card">
            <p className="message"> Your chat begins here</p>
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
    </>
  );
}
export default App;
