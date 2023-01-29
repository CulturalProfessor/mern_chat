import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import axios from "axios";
import { Button } from "@mui/material";
// import { redirect } from "react-router-dom";

function Login() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [redirect,setRedirect]=useState(200);
  const data = {
    name: name,
    room: room,
  };

  async function sendNameRoom(e) {
    await axios
      .post("http://localhost:5000/login", data)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log(redirect);
          alert(res.data.message);
           document.location.href = `/chat?name=${name}&room=${room}`;
        }
        else if (res.status === 201) {
          alert(res.data.message);
          e.preventDefault();
        }else{
        e.preventDefault();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            autocomplete="off"
            type="text"
            onChange={(event) => {
              setName(event.target.value);
              console.log(name);
            }}
          />
        </div>

        <div>
          <input
            placeholder="Room"
            className="joinInput mt-20"
            autocomplete="off"
            type="text"
            onChange={(event) => setRoom(event.target.value)}
          />
        </div>
        <button
          className={"button mt-20"}
          type="submit"
          onClick={(e) => {
            sendNameRoom(e);
          }}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default Login;
