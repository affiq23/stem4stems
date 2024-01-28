import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls, Box } from "@react-three/drei";
import Link from "next/link";
import OpenAI from "openai";

function RotatingImage({ texture }: any) {
  const mesh = useRef<THREE.Mesh | null>(null);

  // Create a rotation animation for the image
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.02;
    }
  });

  return (
    <mesh ref={mesh}>
      <circleGeometry args={[2.5, 60]} />
      <meshBasicMaterial
        attach="material"
        map={texture}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function Content() {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const textureLoader = new THREE.TextureLoader();
      const loadedTexture = textureLoader.load("/stem_logo.png");
      setTexture(loadedTexture);
    }
  }, []);
  const [funFacts, setFunFacts] = useState<{ [key: string]: string | null }>({
    Science: null,
    Technology: null,
    Engineering: null,
    Math: null,
  });

  const openaikey = process.env.OPENAI_API_KEY;
  const openai = new OpenAI({
    apiKey: openaikey,
    dangerouslyAllowBrowser: true,
  });

  const handleExploreClick = async (topic: string) => {
    try {
      const completion = openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `Generate a very unique and educational fun fact about a STEM topic like ${topic} for children around the age of 10. 
            Keep the output strictly just a response. For example, a sample response could be "Did you know that the first computer mouse was made of wood? It was invented by Doug Engelbart in 1964, and it was called a 'mouse' because of its tail-like cable. This early mouse had just one button and was used to control a computer screen. 
            Today's computer mice are much more advanced and come in all shapes and sizes!" The JSON should only have one key: fact `,
          },
        ],
        model: "gpt-3.5-turbo-1106",
        response_format: { type: "json_object" },
      });

      const response = await completion;

      const generatedContent = response.choices[0]?.message?.content || null;

      console.log(generatedContent);

      setFunFacts((prevFunFacts) => ({
        ...prevFunFacts,
        [topic]: generatedContent,
      }));
    } catch (error) {
      console.error("Error generating fun fact:", error);
    }
  };

  return (
    <main className="flex min-h-screen bg-black text-white font-orbitron">
      <aside
        id="default-sidebar"
        className="w-60 bg-gray-800 p-5 ml-5 mt-5 mb-5 rounded-lg shadow-lg"
        aria-label="Sidenav"
      >
        <div className="overflow-hidden py-5 px-3 h-full border-r bg-gray-800 border-gray-700">
          <div className="overflow-hidden w-52 h-52 -translate-x-7">
            <Link href={"/"}>
              <Canvas>
                <ambientLight />
                <pointLight position={[0, 0, 0]} />
                <RotatingImage texture={texture} />
              </Canvas>
            </Link>
          </div>
          <h2 className="text-xl font-semibold mx-4">STEM4stems</h2>
          <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
            <li>
              <Link
                href="/content"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                  <path
                    fill-rule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-3">STEM Success</span>
              </Link>
            </li>
            <li>
              <Link
                href="/quizzes"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                </svg>
                <span className="ml-3">Practice!</span>
              </Link>
            </li>
            <li>
              <Link
                href="/explore"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-3">Explore STEM</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <div className="bg-black text-white min-h-screen p-5">
        {/* Science Section */}
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-32 h-32 bg-blue-500 rounded-lg animate-spin-slow mr-6 mb-4 md:mb-0"></div>
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
            <button
              className="text-blue-400 hover:text-blue-200"
              onClick={() => handleExploreClick("Science")}
            >
              Click to read a fact about the world of science!
            </button>
          </div>
        </div>

        {/* Render Fun Fact */}
        {funFacts.Science && (
          <div className="mt-8 ml-36 bg-blue-900 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-3">Fun Fact!</h2>
            <p className="mb-4 text-blue-300 text-center">
              {JSON.parse(funFacts.Science).fact}
            </p>
          </div>
        )}

        <br />
        {/* Technology Section */}
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-32 h-28 bg-red-500 rounded-full animate-bounce mr-6 mb-4 md:mb-0"></div>
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
            <button
              className="text-red-400 hover:text-red-200"
              onClick={() => handleExploreClick("Technology")}
            >
              Click to learn about a cool innovation in the field of technology!
            </button>
          </div>
        </div>

        {/* Render Fun Fact */}
        {funFacts.Technology && (
          <div className="mt-8 ml-36 bg-red-900 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-3">Fun Fact!</h2>
            <p className="mb-4 text-red-100 text-center">
              {JSON.parse(funFacts.Technology).fact}
            </p>
          </div>
        )}

        <br />
        {/* Engineering Section */}
        <div className="flex flex-col md:flex-row items-center">
          <div
            className="w-0 h-0 
        border-l-[55px] border-l-transparent
        border-b-[80px] border-b-green-500
        border-r-[55px] border-r-transparent animate-spin-slow mr-11 mb-4 md:mb-0 "
          ></div>
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
            <button
              className="text-green-400 hover:text-green-200"
              onClick={() => handleExploreClick("Engineering")}
            >
              Click to read a fact about the world of engineering!
            </button>
          </div>
        </div>

        {/* Render Fun Fact */}
        {funFacts.Engineering && (
          <div className="mt-8 ml-36 bg-green-900 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-3">Fun Fact!</h2>
            <p className="mb-4 text-green-100 text-center">
              {JSON.parse(funFacts.Engineering).fact}
            </p>
          </div>
        )}

        <br />
        {/* Math Section */}
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-32   h-32 bg-yellow-500 rounded-lg animate-wiggle mr-6 mb-4 md:mb-0"></div>
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
            <button
              className="text-yellow-400 hover:text-yellow-200"
              onClick={() => handleExploreClick("Math")}
            >
              Click to hear a mathmatical fact!
            </button>
          </div>
        </div>

        {/* Render Fun Fact */}
        {funFacts.Math && (
          <div className="mt-8 ml-36 bg-yellow-900 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-3">Fun Fact!</h2>
            <p className="mb-4 text-yellow-100 text-center">
              {JSON.parse(funFacts.Math).fact}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
