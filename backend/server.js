import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/user.route.js"; // Adjust the path if necessary
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
const app = express();
dotenv.config();

// Middleware to parse JSON
app.use(express.json());

// File Upload Logic
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

const PORT = process.env.PORT || 4000;
// const MONGO_URL = process.env.MONGO_URI;
const MONGO_URL = process.env.MONGO_URI_LOCAL;

// DBConnection
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

//Cloudionary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECREC_KEY, // Click 'View API Keys' above to copy your API secret
});

app.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
});