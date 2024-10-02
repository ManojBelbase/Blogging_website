import { User } from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcrypt";
import createTokenAndSaveCookies from "../middleware/jwt.js";

export const register = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: "User Photo is required" });
  }
  const { photo } = req.files;
  const allowedFormats = ["image/jpeg", "image/png"];
  if (!allowedFormats.includes(photo.mimetype)) {
    return res.status(400).json({ message: "Invalid photo format" });
  }
  const { name, email, phone, education, role, password } = req.body;
  try {
    if (
      !name ||
      !email ||
      !phone ||
      !education ||
      !role ||
      !password ||
      !photo
    ) {
      return res
        .status(400)
        .json({ message: "Please all fill required field" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User Already Registered with this email" });
    }

    // Upload an image
    const cloudinaryResponse = await cloudinary.uploader.upload(
      photo.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.log(cloudinaryResponse.error);
    }

    // hash password
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      phone,
      education,
      role,
      password: hashPassword,
      photo: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },
    });
    await newUser.save();
    if (newUser) {
      const token = await createTokenAndSaveCookies(newUser._id, res);
      res
        .status(201)
        .json({ message: "User register successfully", newUser, token: token });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    if (!email || !password || !role) {
      return res.status(400).json({ message: "please fill required fields" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user.password) {
      return res.status(400).json({ message: "user password is missing" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (user.role !== role) {
      return res.status(400).json({ message: `Given role ${role} not found` });
    }

    const token = await createTokenAndSaveCookies(user._id, res);
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "User Logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
