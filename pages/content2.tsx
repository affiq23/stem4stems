/* eslint-disable react/no-unescaped-entities */
import React from "react";

export default function Content() {
  return (
    <div className="bg-gray-800 text-white min-h-screen p-5">
      <div className="max-w-6xl mx-auto">
        {/* Science Section */}
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-3xl font-bold mb-3">Science</h2>
          <p className="mb-4">
            Science is like being a super curious explorer! It's about asking
            cool questions and doing fun experiments to find out how things
            work.
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              Explore the wonders of the solar system and the mysteries of the
              universe.
            </li>
            <li>
              Conduct simple experiments at home like creating a vinegar and
              baking soda volcano.
            </li>
            <li>
              Learn about different ecosystems and the importance of
              biodiversity.
            </li>
          </ul>
          <a href="#" className="text-blue-400 hover:text-blue-300">
            Take the Quiz!
          </a>
        </div>

        {/* Technology Section */}
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-3xl font-bold mb-3">Technology</h2>
          <p className="mb-4">
            Technology is like magic that we create! It's all about using tools
            and machines to make our lives better.
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Discover how computers work and the basics of coding.</li>
            <li>Learn about internet safety and digital citizenship.</li>
            <li>
              Explore the world of robotics and how robots help in various
              industries.
            </li>
          </ul>
          <a href="#" className="text-blue-400 hover:text-blue-300">
            Take the Quiz!
          </a>
        </div>

        {/* Engineering Section */}
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-3xl font-bold mb-3">Engineering</h2>
          <p className="mb-4">
            Engineering is building cool stuff! Whether it's constructing a
            simple bridge with popsicle sticks or designing a paper airplane.
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              Engage in fun building projects like bridges, towers, and simple
              machines.
            </li>
            <li>
              Understand the basics of mechanical, civil, and electrical
              engineering through interactive projects.
            </li>
            <li>
              Learn about renewable energy sources and how they are changing the
              world.
            </li>
          </ul>
          <a href="#" className="text-blue-400 hover:text-blue-300">
            Take the Quiz!
          </a>
        </div>

        {/* Math Section */}
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-3xl font-bold mb-3">Math</h2>
          <p className="mb-4">
            Math is like a puzzle that helps us solve problems. You can have fun
            counting their toys, playing with shapes, and solving math puzzles.
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              Explore basic arithmetic through games and real-life applications.
            </li>
            <li>
              Understand shapes, patterns, and measurements in a fun and
              interactive way.
            </li>
            <li>
              Learn about the importance of math in everyday life, from shopping
              to cooking.
            </li>
          </ul>
          <a href="#" className="text-blue-400 hover:text-blue-300">
            Take the Quiz!
          </a>
        </div>
      </div>
    </div>
  );
}
