import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

const Hero = () => {
  const { blogs } = useAuth();

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 mt-4 gap-5 py-2 md:p-6">
      {blogs && blogs.data && blogs.data.length > 0 ? (
        blogs.data.slice(0, 4).map((blog) => (
          <Link
            to="/"
            key={blog._id}
            className="bg-white rounded-md hover:shadow-lg overflow-hidden border transform hover:scale-105 duration-300"
          >
            <div className="group relative">
              <img
                src={blog.blogImage.url}
                alt={blog.title}
                className="h-52 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-75 group-hover:opacity-100 transition-transform duration-300"></div>
              <h1 className="absolute bottom-3 text-white left-3 font-bold group-hover:text-yellow-500 transition-colors duration-300">
                {blog.title}
              </h1>
            </div>
            <div className="flex p-2 items-center gap-3">
              <img
                src={blog.adminPhoto}
                alt=""
                className="h-12 w-12 border-2 rounded-full border-yellow-300"
              />
              <p>{blog.adminName}</p>
            </div>
          </Link>
        ))
      ) : (
        <div>Blogs Not found</div>
      )}
    </div>
  );
};

export default Hero;
