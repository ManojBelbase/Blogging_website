import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-400">
              Welcome to our blog! We share the latest trends, tips, and news in
              the tech world. Stay connected with us!
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:info@blogsite.com"
                  className="hover:text-gray-300"
                >
                  info@blogsite.com
                </a>
              </li>
              <li>
                <a href="tel:+123456789" className="hover:text-gray-300">
                  +1 234 567 89
                </a>
              </li>
              <li>
                <p className="text-gray-400">123 Blog Street, Blog City</p>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="w-6 h-6"
                >
                  <path d="M12.635 0H3.365A3.365 3.365 0 0 0 0 3.365v9.27A3.365 3.365 0 0 0 3.365 16h9.27A3.365 3.365 0 0 0 16 12.635V3.365A3.365 3.365 0 0 0 12.635 0zm-6.248 13.803v-5.798H4.375v5.798H6.387zm-1.006-6.635c-.686 0-1.247-.567-1.247-1.265 0-.7.561-1.265 1.247-1.265s1.247.566 1.247 1.265c0 .699-.561 1.265-1.247 1.265zm8.623 6.635H11.38v-2.91c0-.692-.012-1.584-.966-1.584-.967 0-1.115.755-1.115 1.535v2.96H7.28v-5.798h1.922v.789h.028c.267-.505.917-1.038 1.891-1.038 2.02 0 2.394 1.33 2.394 3.064v3.005z" />
                </svg>
              </a>
              <a href="#" className="hover:text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="w-6 h-6"
                >
                  <path d="M16 3.538a6.461 6.461 0 0 1-1.885.516 3.301 3.301 0 0 0 1.443-1.816 6.533 6.533 0 0 1-2.084.797 3.28 3.28 0 0 0-5.593 2.99A9.325 9.325 0 0 1 1.114 2.1 3.28 3.28 0 0 0 2.13 7.086a3.267 3.267 0 0 1-1.485-.41v.041a3.284 3.284 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.114c-.211 0-.417-.02-.615-.058a3.283 3.283 0 0 0 3.065 2.278A6.588 6.588 0 0 1 0 13.207a9.29 9.29 0 0 0 5.031 1.475c6.038 0 9.341-5.002 9.341-9.341 0-.143-.003-.285-.01-.426A6.676 6.676 0 0 0 16 3.538z" />
                </svg>
              </a>
              <a href="#" className="hover:text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="w-6 h-6"
                >
                  <path d="M8 0a8 8 0 1 0 8 8 8.009 8.009 0 0 0-8-8zm4.448 4.438v.507l-.003.074-.145.002a3.787 3.787 0 0 0-.217-.007 6.266 6.266 0 0 0-.703-.038H7.527v.953h3.296a4.506 4.506 0 0 1-.098.647h-3.2v.994h2.817a4.666 4.666 0 0 1-.229.622H7.825v.987h2.487a6.595 6.595 0 0 1-.823 1.331 3.506 3.506 0 0 1-1.35.94A5.453 5.453 0 0 1 6.36 12.5 6.622 6.622 0 0 1 6 12.471v-.631a3.442 3.442 0 0 0 .965.158 3.665 3.665 0 0 0 1.187-.232 2.894 2.894 0 0 0 .91-.568 3.42 3.42 0 0 0 .688-.873H6.031V8.582h1.994V7.635H6.031v-.994H7.5V6H5.751v-.994h2.007v.94h1.994V6z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 text-center text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} BlogSite. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
