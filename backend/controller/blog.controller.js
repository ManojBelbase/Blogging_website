import mongoose from "mongoose";
import { Blog } from "../models/blog.model.js";
import { v2 as cloudinary } from "cloudinary";

export const createBlog = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: "Blog Photo is required" });
  }
  const { blogImage } = req.files;
  const allowedFormats = ["image/jpeg", "image/png"];
  if (!allowedFormats.includes(blogImage.mimetype)) {
    return res.status(400).json({ message: "Invalid photo format" });
  }
  const { title, category, about } = req.body;
  try {
    if (!title || !category || !about) {
      return res
        .status(400)
        .json({ message: "Title, Category and about are required fields" });
    }

    const adminName = req?.user?.name;
    const adminPhoto = req?.user?.photo?.url;
    const createdBy = req?.user?._id;

    // Upload an image
    const cloudinaryResponse = await cloudinary.uploader.upload(
      blogImage.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.log(cloudinaryResponse.error);
    }

    const blogData = {
      title,
      category,
      about,
      adminName,
      adminPhoto,
      createdBy,
      blogImage: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },
    };
    const blog = await Blog.create(blogData);

    res.status(201).json({ message: "Blog created successfully", data: blog });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};

// Delete Blog
export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (!blog) {
    res.status(400).json({ message: "Blog not found" });
  }
  await blog.deleteOne();
  res.status(200).json({ message: "Blog deleted successfully" });
};

// Get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const data = await Blog.find();
    console.log(data);
    if (!data) {
      res.status(404).json({ message: "Blogs not found" });
    }
    res.status(200).json({ message: "Blogs fetch successfully", data: data });
  } catch (error) {}
};

// Get blogs by Id
export const getBlogById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid User id" });
  }
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog fetch successfully", data: blog });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Single user BLogs
export const getMyBlogs = async (req, res) => {
  const createdBy = req.user._id;
  const myBlogs = await Blog.find({ createdBy });
  res.status(200).json({ data: myBlogs });
};

//Update Blog
export const updateBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Blog id" });
  }
  const updatedBlogData = req.body;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, updatedBlogData, {
      new: true,
    });
    if (!updatedBlog) {
      res.status(400).json({ message: "Book Not found" });
    }

    res
      .status(200)
      .json({ message: "Blog Update successfully", data: updatedBlog });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
