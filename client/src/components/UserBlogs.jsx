import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../api";
const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const id = localStorage.getItem("user");
  const sendRequest = async () => {
    const res = await axios.get(`${baseURL}/blogs/user/${id}`).catch((err) => {
      console.log(err);
    });
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => {
      setBlogs(data.blogs);
      console.log(data.blogs);
    });
  }, []);
  return <div>UserBlogs</div>;
};

export default UserBlogs;
