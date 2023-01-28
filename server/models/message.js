import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    room: { type: String, required: true },
    users: [
      {type : String, required : true}
    ],
    messages: [{
      user: { type: String },
      text: { type: String },
      time: { type: String },
    }],
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
