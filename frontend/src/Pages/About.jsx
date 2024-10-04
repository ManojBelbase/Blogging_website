import React from "react";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* About Section */}
      <section className="mb-8">
        <h1 className="text-3xl font-semibold mb-4">About</h1>
        <p className="text-gray-700">
          Welcome to my personal blog! I am a passionate developer with a
          deep interest in technology and innovation. My goal is to share knowledge,
          insights, and my journey through the world of tech and beyond.
        </p>
      </section>

      {/* Technical Expertise Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Technical Expertise</h2>
        <p className="text-gray-700">
          I specialize in a variety of technical domains, including:
        </p>
        <ul className="list-disc list-inside mt-2 text-gray-600">
          <li>Full-stack web development (React, Node.js, Express)</li>
          <li>Frontend technologies (HTML, CSS, JavaScript, Tailwind CSS)</li>
          <li>Backend development and API design</li>
          <li>Database management (MongoDB, MySQL)</li>
          <li>Version control with Git and GitHub</li>
          <li>Cloud services and deployment (AWS, Docker)</li>
        </ul>
      </section>

      {/* Professional Highlights Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Professional Highlights</h2>
        <p className="text-gray-700">
          Over the years, I’ve had the opportunity to work on various exciting
          projects and roles:
        </p>
        <ul className="list-disc list-inside mt-2 text-gray-600">
          <li>Lead developer on multiple web application projects</li>
          <li>Collaborated with cross-functional teams to deliver software solutions</li>
          <li>Conducted workshops on web development for aspiring developers</li>
          <li>Contributed to open-source projects and community-driven initiatives</li>
        </ul>
      </section>

      {/* Personal Interests Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Personal Interests</h2>
        <p className="text-gray-700">
          Beyond technology, I have a wide array of interests that keep me inspired
          and motivated:
        </p>
        <ul className="list-disc list-inside mt-2 text-gray-600">
          <li>Exploring the latest tech trends and gadgets</li>
          <li>Reading sci-fi novels and tech blogs</li>
          <li>Photography and capturing nature’s beauty</li>
          <li>Playing chess and solving puzzles to challenge my mind</li>
          <li>Traveling to new destinations and experiencing different cultures</li>
        </ul>
      </section>

      {/* Inspiration Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Inspiration</h2>
        <p className="text-gray-700">
          My inspiration comes from the ever-evolving nature of technology and the
          desire to create something impactful. The power of code to solve problems
          and bring ideas to life drives me every day. Innovators like Elon Musk and
          developers contributing to open-source communities have always been my
          source of motivation.
        </p>
      </section>
    </div>
  );
};

export default About;
