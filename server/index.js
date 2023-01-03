import express from "express";
import mongoose from "mongoose";

const app = express();
const CONNETION_URL =
  "mongodb+srv://Vinayak:25JUL2001@cluster0.tkjkufd.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;
mongoose.set("strictQuery", false);
mongoose
  .connect(CONNETION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  }).sockets;
