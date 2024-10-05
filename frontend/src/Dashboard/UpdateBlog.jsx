import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdateBlog = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const navigate = useNavigate();

  // Handle image upload and preview
  const chnageImageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImagePreview(reader.result); // Show image preview
        setBlogImage(file); // Set the image file for form submission
      };
    }
  };

  // Fetch existing blog data to update
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/blogs/single-blog/${id}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setTitle(data?.data?.title);
        setCategory(data?.data?.category);
        setBlogImage(data?.data?.blogImage?.url);
        setAbout(data?.data?.about);
      } catch (error) {
        toast.error("Please fill required fields" || error.message);
      }
    };
    fetchBlog();
  }, [id]);

  // Handle blog update submission
  const handleUpdateBlog = async (e) => {
    e.preventDefault();

    if (about.length < 50) {
      toast.error("The About section must be at least 50 characters long");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    formData.append("blogImage", blogImage);

    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/blogs/update/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Blog updated successfully!");
      setTitle("");
      setCategory("");
      setAbout("");
      setBlogImage("");
    } catch (error) {
      toast.error("Please fill the required fields");
    }
  };

  const gotoDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="pt-8 pl-3 md:pl-0">
      <div className="border w-full max-w-[600px] mx-auto shadow-lg p-6 rounded-lg text-black">
        <form onSubmit={handleUpdateBlog}>
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl font-semibold">Update Blog</h1>
            <button
              onClick={gotoDashboard}
              className="text-sm text-blue-500 hover:text-blue-700"
            >
              Dashboard
            </button>
          </div>

          {/* Category */}
          <div className="mb-6">
            <label className="block mb-2  ">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Category</option>
              <option value="Tech">Tech</option>
              <option value="Science">Science</option>
              <option value="History">History</option>
              <option value="Travel">Travel</option>
              <option value="Beauty">Beauty</option>
              <option value="Adventure">Adventure</option>
              <option value="Food">Food</option>
              <option value="Business">Business</option>
            </select>
          </div>

          {/* Title */}
          <div className="mb-6">
            <label className="block mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter the blog title"
            />
          </div>

          {/* Image Preview */}
          <div className="mb-6">
            <label className="block mb-2 ">Blog Image</label>
            <div className="max-w-md h-36 mb-4">
              <img
                src={
                  imagePreview
                    ? imagePreview
                    : blogImage
                    ? blogImage
                    : "https://www.hostinger.es/tutoriales/wp-content/uploads/sites/7/2019/02/Que-es-un-blog.webp"
                }
                alt="Preview"
                className="w-full h-full object-contain rounded-md"
              />
            </div>
            <input
              type="file"
              onChange={chnageImageHandler}
              className="block w-full px-4 py-2 border rounded-md border-black focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* About the Blog */}
          <div className="mb-6">
            <label className="block mb-2">About</label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows={5}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe your blog content"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="block w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Update Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlog;
