import React from "react";
import OpenAI from "openai";
import { useState } from "react";

export default function Content() {
  const [funFact, setFunFact] = useState<string | null>(null);

  const openaikey = process.env.OPENAI_API_KEY;
  const openai = new OpenAI({
    apiKey: openaikey,
    dangerouslyAllowBrowser: true,
  });

  const handleExploreClick = async (topic: string) => {
    try {
      const completion = openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: `Generate a fun fact about ${topic} for 10 year olds.` },
          { role: "assistant", content: "json" }, // Ensure the word 'json' is present
        ],
        model: "gpt-3.5-turbo-1106",
        response_format: { type: "json_object" },
      });
  
      const response = await completion;
  
      const generatedContent = response.choices[0]?.message?.content || null;
  
      console.log(generatedContent);
      setFunFact(generatedContent);
    } catch (error) {
      console.error("Error generating fun fact:", error);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen p-5">
      {/* Science Section */}
      <div className="flex flex-col md:flex-row items-center">
        <div className="w-32 h-32 bg-blue-500 rounded-lg animate-bounce mr-6 mb-4 md:mb-0"></div>
        <div>
          <h2 className="text-4xl font-bold mb-3">
            Science: The World of Discovery
          </h2>
          <p className="mb-4">
            Dive into the mysteries of the universe! From exploring outer space
            to understanding the tiny atoms, science is all about discovery and
            curiosity.
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Experiment with fun science projects.</li>
            <li>Learn about different animals and their habitats.</li>
            <li>Discover the wonders of the solar system.</li>
          </ul>
          <button
            className="text-blue-400 hover:text-blue-300"
            onClick={() => handleExploreClick("Science")}
          >
            Explore Science
          </button>
        </div>
      </div>

      {/* Render Fun Fact */}
      {funFact && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-3">Fun Fact</h2>
          <p className="mb-4">{funFact}</p>
        </div>
      )}

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
            <button
            className="text-blue-400 hover:text-red-300"
            onClick={() => handleExploreClick("Technology")}
          >
            Explore Science
          </button>
          </div>
        </div>

        {/* Render Fun Fact */}
      {funFact && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-3">Fun Fact</h2>
          <p className="mb-4">{funFact}</p>
        </div>
      )}


        {/* Engineering Section */}
        <div className="flex flex-col md:flex-row items-center">
        <div className="w-32 h-32 bg-green-500 rounded-lg animate-bounce mr-6 mb-4 md:mb-0"></div>
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
            className="text-blue-400 hover:text-red-300"
            onClick={() => handleExploreClick("Engineering")}
          >
            Explore Engineering
          </button>
          </div>
        </div>

        {funFact && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-3">Fun Fact</h2>
          <p className="mb-4">{funFact}</p>
        </div>
      )}

        {/* Math Section */}
        <div className="flex flex-col md:flex-row items-center">
        <div className="w-32 h-32 bg-yellow-500 rounded-lg animate-bounce mr-6 mb-4 md:mb-0"></div>
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
            className="text-blue-400 hover:text-red-300"
            onClick={() => handleExploreClick("Math")}
          >
            Explore Math
          </button>
          </div>
        </div>

        {funFact && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-3">Fun Fact</h2>
          <p className="mb-4">{funFact}</p>
        </div>
      )}
      </div>
  );
}
