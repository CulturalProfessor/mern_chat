import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  user: { type: String, required: true },
  room: { type: String, required: true },
  text: { type: String, required: true },
  time: { type: String, required: true },
});

const PostMessage=mongoose.model('PostMessage',messageSchema);
export default PostMessage;