import express from "express";
import {
  getAdmins,
  login,
  logout,
  myProfile,
  register,
} from "../controller/user.controller.js"; // Ensure the path is correct
import { isAdmin, isAuthenticated } from "../middleware/authUser.js";

const router = express.Router();

// POST /register - Register a new user
router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/my-profile", isAuthenticated, myProfile);
router.get("/admins", getAdmins);

export default router;
