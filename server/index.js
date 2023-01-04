import express from "express";
import mongoose from "mongoose";
import http from "http";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import { Server } from "socket.io";

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
    const io = new Server(server, {
      cors: {
        origin: "http://localhost:3000",
        credentials: true,
      },
    });

    io.on("connection", function (socket) {
      console.log("Made socket connection");
    });
  })
  .catch((err) => {
    console.log(err);
  });
