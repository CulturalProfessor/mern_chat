import React,{useState} from 'react'
import { Link } from "react-router-dom";
import "./login.css";
import axios from 'axios';

function Login() {
const [name, setName] = useState("");
const [room, setRoom] = useState("");

  const data={
    name:name,
    room:room
  }

  function sendNameRoom(e) {
    e.preventDefault();
    axios.post("http://localhost:5000/login",data).then((res)=>{
      console.log(res);
      // if(res.status==200){
        alert(res.data.message);
      // }
    }).catch((err)=>{
      console.log(err);
    })
  }

return (
  <div className="joinOuterContainer">
    <div className="joinInnerContainer">
      <h1 className="heading">Join</h1>
      <div>
        <input
          placeholder="Name"
          className="joinInput"
          type="text"
          onChange={(event) => {setName(event.target.value)
          console.log(name);
          }}
        />
      </div>

      <div>
        <input
          placeholder="Room"
          className="joinInput mt-20"
          type="text"
          onChange={(event) => setRoom(event.target.value)}
        />
      </div>

      <Link
        onClick={(e) =>  (!name || !room ? e.preventDefault() : null)
      }
        to={`/chat?name=${name}&room=${room}`}
      >
        <button className={"button mt-20"} type="submit" onClick={(e)=>sendNameRoom(e)}>
          Sign In
        </button>
      </Link>
    </div>
  </div>
);
}

export default Login;