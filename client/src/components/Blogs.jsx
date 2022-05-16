import React, { useEffect, useState } from "react";
import { baseURL } from "../api";
import axios from "axios";
import Blog from "./Blog";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const sendRequest = async () => {
    await axios
      .get(`${baseURL}/blogs`)
      .then((res) => {
        setBlogs(res.data.blogs);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    sendRequest();
  }, []);
  return (
    <>
      <h1>Blogs</h1>
      {blogs &&
        blogs.map((blog) => {
          return (
            <Blog blog={blog} key={blog._id} />
          );
        })}
    </>
  );
};

export default Blogs;
