import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./Pages/Home";
import Blogs from "./Pages/Blogs";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Creater from "./Pages/Creater";
import Dashboard from "./Pages/Dashboard";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import { Toaster } from "react-hot-toast";
import UpdateBlog from "./Dashboard/UpdateBlog";
import BlogDetails from "./Home/BlogDetails";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="creators" element={<Creater />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="/blog/details/:id" element={<BlogDetails />} />
        </Route>

        <Route path="dashboard" element={<Dashboard />} />
        {/* Update Blog route */}
        <Route path="/blog/update/:id" element={<UpdateBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
