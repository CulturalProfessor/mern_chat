import "./App.css";
import { Routes, Route } from "react-router-dom";
import Chat from './component/chat/chat.js'
import Login from './component/login/login.js'
import React from "react";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Login/>} />
      <Route path="/chat" element={<Chat/>} />
    </Routes>
  );
}

export default App;
