import express from "express";
import { login, logout, register } from "../controller/user.controller.js"; // Ensure the path is correct

const router = express.Router();

// POST /register - Register a new user
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

export default router;
