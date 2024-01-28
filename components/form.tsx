import React, { useState } from "react";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

interface GeneratedContent {
  question: string;
  answers: { [key: string]: string };
  correct_answer: string;
}

export default function Form() {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(
    null
  );
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTopic(e.target.value);
  };

  const handleUserAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value.toUpperCase()); // Convert the answer to uppercase for case-insensitive comparison
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

      const generatedContent =
        response.choices[0]?.message?.content || null;

      setGeneratedContent(JSON.parse(generatedContent as string) as GeneratedContent);
      setIsAnswerCorrect(null); // Reset the answer correctness status
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
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <label htmlFor="selectSTEM">
        Select a topic:
        <select
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

      <button onClick={handleGenerateAnswer} style={{ marginLeft: "10px", padding: "8px 16px" }} type="button" className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
        Start Quiz
      </button>

      {generatedContent && (
        <div style={{ marginTop: "20px" }}>
          <p>{generatedContent.question}</p>
          <form>
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
                  <label htmlFor={optionKey}>{`${optionKey}: ${optionText}`}</label>
                </div>
              )
            )}
          </form>
          <button onClick={handleCheckAnswer} style={{ marginTop: "10px" }} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
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
  );
}
