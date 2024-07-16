import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender, email } =
      req.body;

    if (
      !fullName ||
      !userName ||
      !password ||
      !confirmPassword ||
      !gender ||
      !email
    ) {
      res.status(400).json({ message: "All fields are required" });
    }
    if (password !== confirmPassword) {
      res.status(400).json({ message: "Password does not match" });
    }
    const user = await User.findOne({ userName });
    if (user) {
      res.status(400).json({ message: "User alredy exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${userName}`;
    const profilePhoto =
      gender === "male" ? maleProfilePhoto : femaleProfilePhoto;
    User.create({
      fullName,
      userName,
      password: hashedPassword,
      gender,
      profilePhoto,
      email,
    });
    return res
      .status(201)
      .json({ message: "User created successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ userName });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }
    const isPassMatch = await bcrypt.compare(password, user.password);
    if (!isPassMatch) {
      return res
        .status(400)
        .json({ message: "Invalid Username or Password", success: false });
    }
    const tokendata = {
      userId: user._id,
    };

    const token = await jwt.sign(tokendata, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        _id: user._id,
        userName: user.userName,
        fullName: user.fullName,
        profilePhoto: user.profilePhoto,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged Out successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getOtherUser = async (req,res) => { 
  try {
    const loggedInUserId = req.id;
    const otherUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password")
    return res.status(200).json(otherUsers)
  } catch (error) {
    console.log(error);  
  }
 }