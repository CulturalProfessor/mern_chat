import express from "express";
import {getPosts,updatePost} from '../controllers/post.js'

const router=express.Router();

router.get("/",getPosts);
router.post("/:id",updatePost);

export default router;