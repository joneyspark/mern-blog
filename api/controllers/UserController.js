import User from "../model/User.js";
import bcrypt from "bcrypt";

export const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users) return res.status(404).send("No users found");
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
  }
};

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPwd = await bcrypt.hashSync(password, 10);
    const checkUser = await User.findOne({ email });
    if (checkUser) return res.status(400).send("User already exists");
    const newUser = new User({ name, email, password: hashedPwd, blogs: [] });
    const user = await newUser.save();
    res.status(201).json({ user });
  } catch (error) {
    console.log(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (!existingUser) return res.status(404).send("User does not exist");
  const isMatch = await bcrypt.compare(password, existingUser.password);
  if (!isMatch) return res.status(400).send("Incorrect password");
  res.status(200).json({ message: "Login successful" });
};
