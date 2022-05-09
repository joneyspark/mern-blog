import express from "express";
import { getAllBlog, addBlog, updateBlog, getBlogId, deleteBlog, getUserBlog } from "../controllers/BlogController";

const blogRouter = express.Router();

blogRouter.get("/", getAllBlog);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.get("/:id", getBlogId);
blogRouter.delete("/:id", deleteBlog);
blogRouter.get("/user/:id", getUserBlog);

export default blogRouter;
