import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

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

  const handleDeletePost = async (blogId) => {
    try {
      const response = await axios
        .delete(`http://localhost:4000/api/blogs/delete/${blogId}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success("Blog deleted successfully!" || res.data.message);
          setMyBlogs((value) => value.filter((blog) => blog._id !== blogId));
        });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error(
          "Unauthorized: You do not have permission to delete this post."
        );
      } else if (error.response && error.response.status === 404) {
        toast.error("Blog not found.");
      } else {
        toast.error(
          "An error occurred while trying to delete the blog. Please try again."
        );
      }
      console.error(error);
    }
  };

  return (
    <div className="pt-8 pl-3 md:pl-1 md:ml-60 mr-3">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 ">
        {loading ? (
          <p>Loading your blogs...</p>
        ) : myBlogs && myBlogs.length > 0 ? (
          myBlogs.map((blog) => (
            <div
              key={blog._id}
              className="min-h-52 border border-black  hover:shadow-lg flex flex-col rounded-md pb-4 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
            >
              <div className="image">
                <img
                  src={
                    blog.blogImage.url ||
                    "https://www.hostinger.es/tutoriales/wp-content/uploads/sites/7/2019/02/Que-es-un-blog.webp"
                  }
                  alt={blog.title}
                  className="w-full h-40 object-cover border rounded-t-md"
                />
              </div>
              <div className="px-3 pt-2 flex flex-col gap-2">
                <p className="text-sm">{blog.category}</p>
                <p className="text-lg font-semibold line-clamp-1">
                  {blog.title}
                </p>
                <div className="flex items-center justify-between">
                  <button className="px-2 py-1 rounded-md border border-gray-400 text-blue-500 ">
                    <Link
                      to={`/blog/update/${blog._id}`}
                      className="hover:underline"
                    >
                      Update
                    </Link>
                  </button>
                  <button
                    onClick={() => handleDeletePost(blog._id)}
                    className="px-2 py-1 rounded-md border border-gray-400 text-red-400 "
                  >
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
