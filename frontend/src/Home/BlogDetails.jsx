import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  console.log(id);
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/blogs/single-blog/${id}`,
          {
            withCredentials: true,
          }
        );
        console.log(data);
        setBlog(data.data);
      } catch (error) {
        toast.error("Only Logged In user can access this blog");
      }
    };
    fetchBlog();
  }, [id]);
  return (
    <div className="">
      <div className="my-2">
        {blog ? (
          <div className="">
            <p className="text-blue-500 mb-2">{blog?.category}</p>
            <h1 className="text-xl font-semibold mb-4">{blog?.title}</h1>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 ">
                <img
                  src={blog?.adminPhoto}
                  alt={blog.adminName}
                  className="w-full h-full rounded-full"
                />
              </div>
              <p>{blog?.adminName}</p>
            </div>
            {/* ff */}
            <div className="mt-4 grid md:grid-cols-2 gap-4">
              <div className="border h-full max-h-96 rounded-md">
                <img
                  src={blog?.blogImage?.url}
                  alt=""
                  className="w-full h-full object-fill rounded-md"
                />
              </div>
              <div>
                <p className="">{blog?.about}</p>
              </div>
            </div>
          </div>
        ) : (
          "Can't fetch"
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
