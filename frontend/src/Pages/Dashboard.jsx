import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import Sidebar from "../Dashboard/Sidebar";
import MyProfile from "../Dashboard/MyProfile";
import MyBlogs from "../Dashboard/MyBlogs";
import CreateBlogs from "../Dashboard/CreateBlogs";
import UpdateBlog from "../Dashboard/UpdateBlog";
const Dashboard = () => {
  const { profile, isAuthenticated } = useAuth();

  const [component, setComponent] = useState("My Blog");
  return (
    <div>
      <div>
        <Sidebar component={component} setComponent={setComponent} />
        {component === "My Profile" ? (
          <MyProfile profile={profile}/>
        ) : component === "Create Blog" ? (
          <CreateBlogs />
        ) : component === "Update Blog" ? (
          <UpdateBlog />
        ) : (
          <MyBlogs />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
