import React, { useEffect, useRef, useState } from "react";
import OpenAI from "openai";
import dotenv from "dotenv";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import Link from "next/link";
dotenv.config();

interface GeneratedContent {
  question: string;
  answers: { [key: string]: string };
  correct_answer: string;
}

function RotatingImage({ texture }: any) {
  const mesh = useRef<THREE.Mesh | null>(null);

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

export default function Form() {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const textureLoader = new THREE.TextureLoader();
      const loadedTexture = textureLoader.load("/stem_logo.png");
      setTexture(loadedTexture);
    }
  }, []);

  const [selectedTopic, setSelectedTopic] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [generatedContent, setGeneratedContent] =
    useState<GeneratedContent | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTopic(e.target.value);
  };

  const handleUserAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value.toUpperCase());
  };

  const openaikey = process.env.OPENAI_API_KEY;
  const openai = new OpenAI({
    apiKey: openaikey,
    dangerouslyAllowBrowser: true,
  });

  const handleGenerateAnswer = async () => {
    try {
      const completion = openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `Generate a quiz question of a maximum of three sentences about ${selectedTopic} with 4 answer choices, including one correct answer. 
            An example would be:\n\nWhat is the primary function of mitochondria in a cell? 
            \n\nA) Synthesizing proteins\nB) Producing energy (ATP)\nC) Storing genetic information\nD) Facilitating cell division\n\n
            The correct answer would be producing energy. Please include 4 options for the answer. 
            Return all of this data in JSON format, but please make the target audience for 10-year-old kids. The JSON should have three keys: question, answers, correct_answer`,
          },
        ],
        model: "gpt-3.5-turbo-1106",
        response_format: { type: "json_object" },
      });

      const response = await completion;

      const generatedContent = response.choices[0]?.message?.content || null;

      console.log(generatedContent);

      setGeneratedContent(
        JSON.parse(generatedContent as string) as GeneratedContent
      );
      setIsAnswerCorrect(null);
      setUserAnswer("");
    } catch (error) {
      console.error("Error generating answer:", error);
    }
  };

  const handleCheckAnswer = () => {
    if (userAnswer === generatedContent?.correct_answer) {
      setIsAnswerCorrect(true);
    } else {
      setIsAnswerCorrect(false);
    }
  };

  return (
    <main className="flex min-h-screen bg-black text-white">
      <aside
        id="default-sidebar"
        className="w-60 bg-gray-800 p-5 ml-5 mt-5 mb-5 rounded-lg shadow-lg"
        aria-label="Sidenav"
      >
        <div className="overflow-y-hidden py-5 px-3 h-full border-r bg-gray-800 border-gray-700">
          <div className="overflow-y-hidden w-52 h-52 -translate-x-7">
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
      <div
        className="mt-28 dropdown"
        style={{ textAlign: "center", marginLeft: "auto", marginRight: "auto" }}
      >
        <label htmlFor="selectSTEM">
          Select a topic:
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-4"
            name="selectSTEM"
            id="selectSTEM"
            onChange={handleTopicChange}
            value={selectedTopic}
            style={{ marginLeft: "10px" }}
          >
            <option value="science">Science</option>
            <option value="tech">Technology</option>
            <option value="engr">Engineering</option>
            <option value="math">Math</option>
          </select>
        </label>

        <button
          onClick={handleGenerateAnswer}
          style={{ marginLeft: "10px", padding: "8px 16px" }}
          type="button"
          className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2"
        >
          Start Quiz
        </button>

        {generatedContent && (
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <p>{generatedContent.question}</p>
            <form className="max-w-sm mx-auto">
              {Object.entries(generatedContent.answers).map(
                ([optionKey, optionText]) => (
                  <div key={optionKey}>
                    <input
                      type="radio"
                      id={optionKey}
                      name="userAnswer"
                      value={optionKey}
                      checked={userAnswer === optionKey}
                      onChange={handleUserAnswerChange}
                    />
                    <label
                      htmlFor={optionKey}
                    >{`${optionKey}: ${optionText}`}</label>
                  </div>
                )
              )}
            </form>
            <button
              onClick={handleCheckAnswer}
              style={{ marginTop: "10px" }}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Submit
              </span>
            </button>
            {isAnswerCorrect !== null && (
              <p style={{ marginTop: "10px" }}>
                {isAnswerCorrect ? "Correct!" : "Incorrect. Try again!"}
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
