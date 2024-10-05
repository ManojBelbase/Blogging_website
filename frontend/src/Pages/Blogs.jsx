import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

const Blogs = () => {
  const { blogs } = useAuth();

  const [allBlogs, setAllBlogs] = useState(blogs?.data || []);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter by category
  const handleFilterByCategory = (e) => {
    const category = e.target.value;
    let filteredBlogs = blogs?.data || [];

    if (category !== "") {
      filteredBlogs = filteredBlogs.filter((blog) =>
        blog?.category?.includes(category)
      );
    }

    // Apply search on filtered results
    if (searchQuery) {
      filteredBlogs = filteredBlogs.filter(
        (blog) =>
          blog.title?.toLowerCase().includes(searchQuery) ||
          blog.author?.toLowerCase().includes(searchQuery)
      );
    }

    setAllBlogs(filteredBlogs);
  };

  // Search functionality
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    let filteredBlogs = blogs?.data || [];

    if (query !== "") {
      filteredBlogs = filteredBlogs.filter(
        (blog) =>
          blog.title?.toLowerCase().includes(query) ||
          blog.author?.toLowerCase().includes(query)
      );
    }

    // Apply category filter on search results
    const selectedCategory = document.querySelector("select").value;
    if (selectedCategory) {
      filteredBlogs = filteredBlogs.filter((blog) =>
        blog?.category?.includes(selectedCategory)
      );
    }

    setAllBlogs(filteredBlogs);
  };

  return (
    <div className="mt-6">
      <h1 className="text-2xl font-semibold">All Blogs</h1>
      <div className="my-4 md:flex items-center justify-between">
        {/* Filter by Category */}
        <div className="flex items-center mb-3">
          <p>Filter By Category:</p>
          <select
            onChange={handleFilterByCategory}
            className="h-8 rounded-sm outline-none px-2 border border-black"
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
        {/* Search functionality */}
        <div className="border px-2 py-1 rounded-sm border-black flex items-center ml-4">
          <input
            type="text"
            className="outline-none border-0 bg-transparent"
            placeholder="Search Blogs"
            onChange={handleSearch}
          />
          {searchQuery === "" ? (
            <CiSearch className="text-2xl cursor-pointer" />
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
        {allBlogs.length > 0 ? (
          allBlogs.map((blog) => {
            return (
              <Link
                to={`/blog/details/${blog._id}`}
                className="blog-card border border-black hover:shadow-xl rounded-md"
                key={blog._id}
              >
                <div className="h-40 border">
                  <img
                    src={blog?.blogImage?.url}
                    alt=""
                    className="w-full h-full object-cover rounded-t-md"
                  />
                </div>
                <div className="p-2">
                  {blog.createdAt ? (
                    <div className="font-extralight text-gray-600 text-sm flex items-center justify-between">
                      <p>
                        {new Date(blog.createdAt).toISOString().split("T")[0]}
                      </p>
                      <p className="font-light">{blog.category}</p>
                    </div>
                  ) : (
                    <p className="font-extralight text-gray-600 text-base">
                      Unknown Date
                    </p>
                  )}
                  <p className="text-xl line-clamp-2 font-normal">
                    {blog?.title}
                  </p>
                  <button className=" flex items-center justify-between gap-2 text-xs uppercase font-semibold pt-3">
                    Read More <FaPlus />
                  </button>
                </div>
              </Link>
            );
          })
        ) : (
          <p>No blogs available.</p>
        )}
      </div>
    </div>
  );
};

export default Blogs;
