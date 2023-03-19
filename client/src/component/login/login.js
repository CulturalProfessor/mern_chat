import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import axios from "axios";
import { Button } from "@mui/material";
import { Navigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [redirect, setRedirect] = useState(200);

  async function sendUsernameRoom(e) {
    e.preventDefault();

    const data = {
      username: username,
      room: room,
    };

    try {
      const res = await axios.post("http://localhost:5000/login", data);

      if (res.status === 200) {
        alert(res.data.message);
        document.location.href = `/chat?username=${username}&room=${room}`;
      } else if (res.status === 201) {
        alert(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input
            placeholder="Username"
            className="joinInput"
            autoComplete="off"
            type="text"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </div>

        <div>
          <input
            placeholder="Room"
            className="joinInput mt-20"
            autoComplete="off"
            type="text"
            onChange={(event) => setRoom(event.target.value)}
          />
        </div>
        <button
          className={"button mt-20"}
          type="submit"
          onClick={(e) => sendUsernameRoom(e)}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default Login;
