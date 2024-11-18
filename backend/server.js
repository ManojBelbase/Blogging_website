import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js"; // Adjust the path if necessary
import blogRoutes from "./routes/blog.route.js";

const app = express();
dotenv.config();

// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());

// CORS configuration
app.use(
  cors({
    origin: ["http://localhost:5173", process.env.FRONTEND_URL], // Allow both origins
    credentials: true, // Allow credentials to be included
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// File Upload Logic
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

const PORT = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGO_URI;
// const MONGO_URL = process.env.MONGO_URI_LOCAL;

// DB Connection
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Defining routes
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECREC_KEY, // Click 'View API Keys' above to copy your API secret
});

// Start the server
app.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
});
