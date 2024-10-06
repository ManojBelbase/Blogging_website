import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Tech = () => {
  const { blogs } = useAuth();

  // Ensure that blogs is an object with a data array before filtering
  const techBlogs = blogs.data?.filter((blog) => blog.category === "Tech");

  return (
    <div className="md:p-6">
      <h1 className="text-lg font-semibold mb-2">Tech</h1>
      <div className="grid md:grid-cols-6">
        {techBlogs && techBlogs.length > 0 ? (
          techBlogs.map((blog) => (
            <div
              className="mr-4 border bg-white border-gray-200 rounded-md hover:shadow-lg overflow-hidden transform hover:scale-105 duration-300"
              key={blog._id}
            >
              <Link to={`/blog/details/${blog._id}`}>
                <div className="group relative h-48">
                  <img
                    src={blog?.blogImage?.url}
                    alt={blog?.title}
                    className="h-full w-full object-cover rounded-t-md"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-75 group-hover:opacity-100 transition-transform duration-300"></div>
                  <h1 className="absolute bottom-5 rounded-lg font-medium px-2 py-1 text-white text-md line-clamp-1">
                    {blog.title}
                  </h1>
                  <p className="absolute bottom-1 px-2 text-white font-thin">
                    {blog.category}
                  </p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="text-center">Blogs Not Found</div>
        )}
      </div>
    </div>
  );
};

export default Tech;
