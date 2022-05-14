import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blog_routes.js";
import userRouter from "./routes/user_routes.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

mongoose
  .connect(
    "mongodb+srv://joneyspark:uBVLZivvvQLkSZV0@cluster0.tlnsf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
  })
  .then(() => {
    console.log("Connected to MongoDB and listening on port 5000");
  })
  .catch((err) => console.log(err));
