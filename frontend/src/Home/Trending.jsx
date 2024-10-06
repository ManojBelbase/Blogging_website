import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Trending = () => {
  const { blogs } = useAuth();

  const responsive = {
    superLargeDesktop: {
      // For large screens, show 5 items
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      // For standard desktops, show 3 items
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      // For tablet devices, show 2 items
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      // For mobile devices, show 1 item
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="md:p-6">
      <h1 className="text-xl font-semibold mb-2 md:mb-4">Trending</h1>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        // showDots={true}
      >
        {blogs && blogs.data && blogs.data.length > 0 ? (
          blogs.data.map((blog) => (
            <div
              className="p-2 mr-2 bg-white border-gray-200 rounded-md hover:shadow-lg overflow-hidden transform hover:scale-100 duration-300 border-2"
              key={blog._id}
            >
              <Link to={`/blog/details/${blog._id}`}>
                <div className="group relative">
                  <img
                    src={blog.blogImage.url}
                    alt={blog.title}
                    className="h-52 w-full object-cover rounded-t-md"
                  />
                  <h1 className="absolute top-2 left-2 bg-blue-500 rounded-lg px-2 py-1 text-white text-sm transition-colors duration-300">
                    {blog.category}
                  </h1>
                </div>
                <div className="pl-2 mt-4 mb-2">
                  <h1 className="font-semibold text-md mb-2 line-clamp-1">
                    {blog.title}
                  </h1>
                  <div className="flex items-center gap-3">
                    <img
                      src={blog.adminPhoto}
                      alt={blog.adminName}
                      className="h-12 w-12 border-2 rounded-full border-yellow-300"
                    />
                    <p>{blog.adminName}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="text-center">Blogs Not Found</div>
        )}
      </Carousel>
    </div>
  );
};

export default Trending;
