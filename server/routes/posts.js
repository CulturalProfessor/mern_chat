import express from "express";
import {getUsers,login} from '../controllers/post.js'

const router=express.Router();

router.post("/users",getUsers);
router.post("/login",login);


export default router;