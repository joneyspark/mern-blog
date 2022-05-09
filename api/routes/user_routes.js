import express from "express";
import { getAllUser, signup, signin } from "../controllers/UserController.js";

const userRouter = express.Router();

userRouter.get("/", getAllUser);
userRouter.post("/signup", signup);
userRouter.post("/signin", signin);


export default userRouter;