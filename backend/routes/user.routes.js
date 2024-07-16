import express from "express";
import {
  getOtherUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/").get(isAuthenticated, getOtherUser);

export default router;
