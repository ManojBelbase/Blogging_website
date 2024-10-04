import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const MyBlogs = () => {
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchMyBlog = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/blogs/my-blog",
          {
            withCredentials: true,
          }
        );
        console.log("API Response:", response.data); // Ensure response data is correct
        setMyBlogs(response.data.data); // Accessing the "data" field in the response
      } catch (error) {
        toast.error("Unable to Fetch Your Blogs");
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyBlog();
  }, []);

  return (
    <div className="pt-8 pl-3 md:pl-0 md:ml-60">
      <div className=" grid grid-cols-3 gap-3">
        {loading ? (
          <p>Loading your blogs...</p>
        ) : myBlogs && myBlogs.length > 0 ? (
          myBlogs.map((blog) => (
            <div
              key={blog._id}
              className="min-h-52 border hover:shadow-lg flex flex-col rounded-t-md pb-4 transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
            >
              <div className="image border">
                <img
                  src={blog.blogImage.url}
                  alt={blog.title}
                  className="w-full h-40 object-cover border rounded-t-md "
                />
              </div>
              <div className="px-3 pt-2 flex flex-col gap-2">
                <p className="text-sm">{blog.category}</p>
                <p className="text-lg font-semibold line-clamp-1">{blog.title}</p>
                <div className="flex items-center justify-between">
                  <button className="px-2 py-1 rounded-md border border-gray-400 text-blue-500 ">
                    Update
                  </button>
                  <button className="px-2 py-1 rounded-md border border-gray-400 text-red-400 ">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No blogs found.</p>
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
