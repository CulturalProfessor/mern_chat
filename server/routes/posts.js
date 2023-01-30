import express from "express";
import {getUsers,login,getMessages,updateMessages} from '../controllers/post.js'

const router=express.Router();

router.post("/getUsers",getUsers);
router.post("/getMessages",getMessages);
router.post("/updateMessages",updateMessages);
router.post("/login",login);


export default router;