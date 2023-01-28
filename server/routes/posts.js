import express from "express";
import {getMessages,login} from '../controllers/post.js'

const router=express.Router();

router.get("/messages",getMessages);
router.post("/login",login);


export default router;