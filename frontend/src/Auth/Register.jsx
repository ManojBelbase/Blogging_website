import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [education, setEducation] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");

  const navigate = useNavigate();

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhotoPreview(reader.result);
      setPhoto(file);
    };
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic front-end validation
    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !role ||
      !education ||
      !photo
    ) {
      toast.error("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("education", education);
    formData.append("photo", photo);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/users/register",
        formData
      );
      console.log(response.data);
      toast.success("User registered successfully");

      // Clear form fields
      setName("");
      setRole("");
      setEmail("");
      setPassword("");
      setEducation("");
      setPhone("");
      setPhoto("");
      setPhotoPreview("");

      // Navigate to login page after registration
      navigate("/login");
    } catch (error) {
      // Handle error and display appropriate message
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full max-w-md shadow-md rounded-lg p-8 bg-white">
        <form onSubmit={handleRegister}>
          <div className="font-semibold text-center ">Logo</div>
          <h1 className="text-lg font-semibold mt-3 mb-1">Register</h1>

          {/* Role Selection */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full max-w-md border-2 p-2 mb-2 rounded-md"
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          {/* Name */}
          <div className="mb-2">
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 outline-none border-2 rounded-md"
            />
          </div>

          {/* Email */}
          <div className="mb-2">
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 outline-none border-2 rounded-md"
            />
          </div>

          {/* Phone */}
          <div className="mb-2">
            <input
              type="text"
              placeholder="Enter Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 outline-none border-2 rounded-md"
            />
          </div>

          {/* Password */}
          <div className="mb-2">
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 outline-none border-2 rounded-md"
            />
          </div>

          {/* Education */}
          <select
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            className="w-full max-w-md border-2 p-2 mb-2 rounded-md"
          >
            <option value="">Select Education</option>
            <option value="BCA">BCA</option>
            <option value="MCA">MCA</option>
            <option value="MBA">MBA</option>
            <option value="BBA">BBA</option>
          </select>

          {/* Photo */}
          <div className="mb-2 flex items-center justify-center">
            <div className="photo h-20 w-20 border-2 rounded-full mr-4">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="h-full w-full object-cover rounded-full"
                />
              ) : (
                <span className="text-center text-gray-400">Preview</span>
              )}
            </div>
            <input
              type="file"
              onChange={handleImage}
              className="w-full max-w-md border-2 p-2 mb-2 rounded-md"
            />
          </div>

          <p className="mb-4 text-center">
            Already Registered?{" "}
            <Link className="text-blue-600 font-medium" to={"/login"}>
              Login Now
            </Link>
          </p>
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 rounded-md text-white"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
