import express from 'express';
import {getAllBlog,getById,deleteBlogById,updateBlogById,createBlog } from '../controller/BlogController.js';

const router = express.Router();

router.post("/create",createBlog)
router.get("/getall",getAllBlog)
router.put("/update/:id",updateBlogById)
router.delete("/delete/:id",deleteBlogById)
router.get("/get/:id",getById)



export default router;


