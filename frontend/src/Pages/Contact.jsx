import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
const Contact = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      access_key: "e89fd66a-fe07-4708-90e1-bcd8052964fd",
      name: data.name,
      email: data.email,
      message: data.message,
    };
    try {
      await axios.post("https://api.web3forms.com/submit", userInfo);
      toast.success("message sent successfully");
    } catch (error) {
      toast.error("An error occured")
    }
  };

  // console.log(watch("example")); // watch input value by passing the name of it
  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Contact Us Section */}
      <section className="mb-8">
        <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
        <p className="text-gray-700">
          We’d love to hear from you! Whether you have a question about the
          blog, want to collaborate, or just want to say hello, feel free to get
          in touch.
        </p>
      </section>

      {/* Contact Form */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Send a Message</h2>
        <form
          className="grid grid-cols-1 gap-6 max-w-2xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              className="mt-1 block w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your Name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="mt-1 block w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="you@example.com"
              {...register("email", { required: true })}
            />{" "}
            {errors.email && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div>
            <label className="block text-gray-700">Message</label>
            <textarea
              name="message"
              className="mt-1 block w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your message here"
              rows="4"
              {...register("message", { required: true })}
            ></textarea>
            {errors.message && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Social Media Links */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Connect with Us</h2>
        <p className="text-gray-700 mb-4">
          You can also reach us on social media:
        </p>
        <div className="flex space-x-4">
          <a
            href="https://facebook.com"
            className="text-blue-600 hover:text-blue-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            href="https://twitter.com"
            className="text-blue-500 hover:text-blue-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <a
            href="https://linkedin.com"
            className="text-blue-700 hover:text-blue-900"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://instagram.com"
            className="text-pink-600 hover:text-pink-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </div>
      </section>
    </div>
  );
};

export default Contact;
