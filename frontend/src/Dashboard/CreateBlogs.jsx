import React, { useState } from "react";
import axios from "axios"; // Axios for HTTP requests
import toast from "react-hot-toast"; // Toast notifications

const CreateBlogs = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle image upload and preview
  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImagePreview(reader.result); // Show image preview
      setBlogImage(file); // Set the image file for form submission
    };
  };

  // Handle blog creation submission
  const handlePostBlog = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!title || !category || !about || !blogImage) {
      toast.error("All fields are required");
      return;
    }

    if (about.length < 50) {
      toast.error("The About section must be at least 50 characters long");
      return;
    }

    // Create a FormData object to handle file upload
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    formData.append("blogImage", blogImage);

    try {
      // POST request to create a blog
      setLoading(true);
      const toastId = toast.loading("Creating..."); // Start the loading toast
      const response = await axios.post(
        "http://localhost:4000/api/blogs/create",
        formData,
        {
          withCredentials: true, // Send JWT cookie automatically
          headers: {
            "Content-Type": "multipart/form-data", // Required for file upload
          },
        }
      );
      toast.success("Blog created successfully!", { id: toastId }); // Replace loading toast with success message
      setLoading(false);

      setTitle("");
      setCategory("");
      setBlogImage("");
      setAbout("");
    } catch (error) {
      // Error handling
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized: Please log in as admin", { id: toastId });
      } else {
        toast.error("An error occurred. Please try again.", { id: toastId });
      }
      setLoading(false);
    }
  };

  return (
    <div className="pt-8 pl-3 md:pl-1 md:ml-60">
      <div className="border w-full max-w-[600px] mx-auto border-black shadow-xl p-2 rounded-sm">
        <form onSubmit={handlePostBlog}>
          <h1 className="text-xl font-semibold mt-2 mb-4">Create Blog</h1>

          {/* Category */}
          <div className="mb-4">
            <p className="mb-1">Category</p>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-8 w-full rounded-sm outline-none border border-black"
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
          <div className="mb-4">
            <p className="mb-1">Title</p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-8 w-full px-2 rounded-sm outline-none border border-black"
              placeholder="Enter the blog title"
            />
          </div>

          {/* Image Preview */}
          <div className="mb-4">
            <p className="mb-1">Blog Image</p>
            <div className="max-w-md h-36">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-center border h-full">Image Preview</div>
              )}
            </div>
            <input
              type="file"
              onChange={handleImage}
              className="h-10 py-1 w-full mt-2 px-2 rounded-sm outline-none border border-black"
              accept="image/*"
            />
          </div>

          {/* About the Blog */}
          <div className="mb-4">
            <p className="mb-1">About</p>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows={5}
              className="w-full px-2 rounded-sm outline-none border border-black"
              placeholder="Describe your blog content"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 rounded-md text-white"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogs;
