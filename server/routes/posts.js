import express from "express";
import {getUsers,login,getMessages} from '../controllers/post.js'

const router=express.Router();

router.post("/getUsers",getUsers);
router.post("/getMessages",getMessages);
router.post("/login",login);


export default router;