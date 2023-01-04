import mongoose from "mongoose";

const messageSchema=mongoose.Schema({
    user:String,
    text:String,
    time:Date,
})

const PostMessage=mongoose.model('PostMessage',messageSchema);
export default PostMessage;