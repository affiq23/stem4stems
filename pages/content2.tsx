import React from "react";

export default function Content() {
  return (
    <div className="bg-black text-white min-h-screen p-5">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Science Section */}
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-32 h-32 bg-blue-500 rounded-full animate-spin-slow mr-6 mb-4 md:mb-0"></div>
          <div>
            <h2 className="text-4xl font-bold mb-3">
              Science: The World of Discovery
            </h2>
            <p className="mb-4">
              Dive into the mysteries of the universe! From exploring outer
              space to understanding the tiny atoms, science is all about
              discovery and curiosity.
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Experiment with fun science projects.</li>
              <li>Learn about different animals and their habitats.</li>
              <li>Discover the wonders of the solar system.</li>
            </ul>
            <a href="#" className="text-blue-400 hover:text-blue-300">
              Explore Science
            </a>
          </div>
        </div>

        {/* Technology Section */}
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-32 h-32 bg-red-500 rounded-lg animate-bounce mr-6 mb-4 md:mb-0"></div>
          <div>
            <h2 className="text-4xl font-bold mb-3">
              Technology: Innovations and Inventions
            </h2>
            <p className="mb-4">
              Technology shapes our world! Learn how computers work, discover
              coding, and understand how technology impacts our daily life.
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Explore the basics of coding with fun activities.</li>
              <li>Understand how gadgets and devices function.</li>
              <li>Learn about internet safety and digital citizenship.</li>
            </ul>
            <a href="#" className="text-red-400 hover:text-red-300">
              Discover Technology
            </a>
          </div>
        </div>

        {/* Engineering Section */}
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-32 h-32 bg-green-500 rounded-full animate-pulse mr-6 mb-4 md:mb-0"></div>
          <div>
            <h2 className="text-4xl font-bold mb-3">
              Engineering: Building the Future
            </h2>
            <p className="mb-4">
              Engineering is all about solving problems and building amazing
              things. Discover how bridges are built and robots are programmed.
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Engage in building projects and understand mechanics.</li>
              <li>Learn about renewable energy and eco-friendly designs.</li>
              <li>Explore the world of robotics and automation.</li>
            </ul>
            <a href="#" className="text-green-400 hover:text-green-300">
              Explore Engineering
            </a>
          </div>
        </div>

        {/* Math Section */}
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-32 h-32 bg-yellow-500 rounded-full animate-wiggle mr-6 mb-4 md:mb-0"></div>
          <div>
            <h2 className="text-4xl font-bold mb-3">
              Math: The Language of Logic
            </h2>
            <p className="mb-4">
              Math is everywhere! Learn about numbers, patterns, and
              problem-solving. Discover how math is used in games, nature, and
              everyday life.
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Play with numbers through fun puzzles and games.</li>
              <li>
                Explore shapes, sizes, and measurements in a creative way.
              </li>
              <li>
                Understand how math is used in cooking, shopping, and sports.
              </li>
            </ul>
            <a href="#" className="text-yellow-400 hover:text-yellow-300">
              Discover Math
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
