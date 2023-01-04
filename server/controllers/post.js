import mongoose from "mongoose";
import PostMessage from '../models/message.js';

export const getPosts=async(req,res)=>{
    try{
        const postMessages=await PostMessage.find();
        res.status(200).json(postMessages);
    }catch(err){
        console.log(err);
        res.status(404).json({message:err})
    }
}

export const updatePost=async(req,res)=>{
    const {id:_id}=req.params;
    if(!mongoose.Types.ObjectId.isValid()){
        return res.status(404).send('No post with that id');
    }
    const updatedPost=await PostMessage.findByIdAndUpdate(_id,{new:true});
    res.json(updatedPost);
}