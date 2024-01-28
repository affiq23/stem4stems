import React, { useEffect, useState } from "react";
import OpenAI from "openai";
// import dotenv from 'dotenv';
// dotenv.config();

export default function Form() {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [generatedAnswer, setGeneratedAnswer] = useState("");

  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTopic(e.target.value);
  };
  const openaikey = process.env.OPENAI_API_KEY;
  const openai = new OpenAI({
    apiKey: openaikey,
    dangerouslyAllowBrowser: true,
  });
  const handleGenerateAnswer = async () => {
    console.log("here");

    console.log(openaikey);

    console.log(openai);
    try {
      const completion = openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant designed to output JSON.",
          },
          {
            role: "user",
            content: `Generate information about ${selectedTopic}.`,
          },
        ],
        model: "gpt-3.5-turbo-1106",
        response_format: { type: "json_object" },
      });

      const generatedContent =
        (await completion).choices[0].message.content || "";
      setGeneratedAnswer(generatedContent);
    } catch (error) {
      console.error("Error generating answer:", error);
    }
  };
  return (
    <div>
      <label htmlFor="selectSTEM">
        <select
          name="selectSTEM"
          id="selectSTEM"
          onChange={handleTopicChange}
          value={selectedTopic}
        >
          <option value="science">Science</option>
          <option value="tech">Technology</option>
          <option value="engr">Engineering</option>
          <option value="math">Math</option>
        </select>
      </label>

      <button onClick={handleGenerateAnswer}>Generate Answer</button>

      {generatedAnswer && (
        <div>
          <h3>Generated Answer:</h3>
          <p>{generatedAnswer}</p>
        </div>
      )}
    </div>
  );
}
