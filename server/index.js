import express from "express";
import mongoose from "mongoose";
import http from "http";
import cors from "cors";
import Routes from "./routes/posts.js";
import { Server } from "socket.io";
import Message from "./models/message.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const httpServer = http.createServer(app);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", Routes);

const CONNECTION_URL = `mongodb+srv://${process.env.MONGO_DETAILS}@cluster0.tkjkufd.mongodb.net/?retryWrites=true&w=majority`; // use environment variables
const PORT = process.env.PORT || 5000;

const server = httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

mongoose.set("strictQuery", false);

(async () => {
  try {
    await mongoose.connect(CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connection error", error);
  }
})();

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  console.log("Socket connected");

  socket.on("login", (data) => {
    console.log(data);
    const { name, room } = data;

    // Add the user to the activeUsers list
    activeUsers.push(name);

    // Emit the updated activeUsers list to all sockets
    io.emit("activeUsers", activeUsers);

    socket.join(room);

    Message.find({ room }).then((result) => {
      socket.emit("getMessages", result);
    });
  });

  socket.on("sendMessage", (data) => {
    try {
      console.log(data);
      Message.create(data).then((result) => {
        io.to(data.room).emit("getMessage", result);
      });
    } catch (error) {
      console.log("Socket error", error);
    }
  });

  socket.on("disconnect", () => {  
    console.log("Socket disconnected");

    // Remove the user from the activeUsers list
    const index = activeUsers.indexOf(socket.name);
    if (index !== -1) {
      activeUsers.splice(index, 1);
    }

    // Emit the updated activeUsers list to all sockets
    io.emit("activeUsers", activeUsers);
  });

  socket.on("error", (error) => {
    console.log("Socket connection error", error);
  });
});
