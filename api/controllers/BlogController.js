import mongoose from "mongoose";
import Blog from "../model/Blog.js";
import User from "../model/User.js";

export const getAllBlog = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('user');
    if (!blogs) return res.status(404).send("No blogs found");
    res.status(200).json({ blogs });
  } catch (error) {
    console.log(error);
  }
};

export const addBlog = async (req, res) => {
  const { title, description, image, user } = req.body;
  let existingUser;
  try {
    existingUser = await User.findById(user);
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "Unable TO FInd User By This ID" });
    }
  } catch (err) {
    return res.status(404).json({ message: err });
  }

  const blog = new Blog({
    title,
    description,
    image,
    user,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existingUser.blogs.push(blog);
    await existingUser.save({ session });
    await session.commitTransaction();
    // const result = await blog.save();
    res.status(201).json({ blog });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export const updateBlog = async (req, res, next) => {
  const blogId = req.params.id;
  const { title, description } = req.body;
  try {
    const blog = await Blog.findByIdAndUpdate(blogId, req.body, {
      title,
      description,
    });
    if (!blog) return res.status(404).send("Blog not found");
    res.status(200).json({ blog });
  } catch (error) {
    console.log(error);
  }
};

export const getBlogId = async (req, res, next) => {
  const blogId = req.params.id;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).send("Blog not found");
    res.status(200).json({ blog });
  } catch (error) {
    console.log(error);
  }
};

export const deleteBlog = async (req, res, next) => {
  const blogId = req.params.id;
  try {
    const blog = await Blog.findByIdAndDelete(blogId).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
    if (!blog) return res.status(404).send("Blog not found");
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const getUserBlog = async (req, res, next) => {
  const userId = req.params.id;
  let userBlogs;
  try {
    userBlogs = await User.findById(userId).populate("blogs");
    if (!userBlogs) return res.status(404).send("Blog not found");
    res.status(200).json({ blogs: userBlogs });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
