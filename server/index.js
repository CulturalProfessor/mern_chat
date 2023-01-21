import express from "express";
import mongoose from "mongoose";
import http from "http";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import { Server } from "socket.io";
import PostMessage from "./models/message.js";
import { addUser, removeUser, getUser, getUsersInRoom } from "./users.js";


const app = express();
const httpServer = http.createServer(app);
app.use(cors());
app.use("/", postRoutes);

const CONNETION_URL =
  "mongodb+srv://Vinayak:25JUL2001@cluster0.tkjkufd.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

const server = httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
mongoose.set("strictQuery", false);
mongoose
  .connect(CONNETION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

io.on("connection", function (socket) {
  // console.log("Made socket connection");

  // socket.emit("getMessages",()=>{

  // })
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    // Emit will send message to the user
    // who had joined
    socket.emit("message", {
      user: "admin",
      text: `${user.name},
            welcome to room ${user.room}.`,
    });

    // Broadcast will send message to everyone
    // in the room except the joined user
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name}, has joined` });

    socket.join(user.room);

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
    callback();
  });

     socket.on("sendMessage", (message) => {
      //  const user = getUser(socket.id);
      //  io.to(message.room).emit("message", { user: message.name, text: message.text });
        const msg = new PostMessage({
          user: message.user,
          room: message.room,
          text: message.text,
          time: message.time,
        });
        msg.save().then(() => {
          console.log(msg);
        });
        console.log(socket.id);
      //  io.to(user.room).emit("roomData", {
      //    room: user.room,
      //    users: getUsersInRoom(user.room),
      //  });
      //  callback();
     });

  socket.on("disconnection", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} had left`,
      });
    }
  });

  // socket.on("message", (message) => {
  //   const msg = new PostMessage({
  //     user: message.user,
  //     room:message.room,
  //     text: message.text,
  //     time: message.time,
  //   });
  //   msg.save().then(() => {
  //     console.log(msg);
  //   });
  // });
});
