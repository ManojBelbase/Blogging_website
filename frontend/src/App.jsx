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
import { useAuth } from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";
function App() {
  const { blogs } = useAuth();
  console.log(blogs.data);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="creators" element={<Creater />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
