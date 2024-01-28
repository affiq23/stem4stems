import React, { useState } from "react";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

interface GeneratedContent {
  question: string;
  options: { [key: string]: string };
  correct_answer: string | null;
}

export default function Form() {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(
    null
  );

  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTopic(e.target.value);
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
            The correct answer would be producing energy. 
            Return all of this data in JSON format, but please make the target audience for 10-year-old kids. 
            The JSON response should look like this: { "question": "THE QUESTION SHOULD BE HERE", "answer_choices": { "A": "SOME ANSWER", "B": "SOME ANSWER", "C": "SOME ANSWER", "D": "SOME ANSWER" }, "correct_answer": "SOME ANSWER" }`,
          },
          {
            role: "user",
            content: `Generate information about ${selectedTopic}.`,
          },
        ],
        model: "gpt-3.5-turbo-1106",
        response_format: { type: "json_object" },
      });

      const response = await completion;

      // Log the JSON response to the console
      console.log(response);

      const generatedContent =
        response.choices[0]?.message?.content || null;

      setGeneratedContent(JSON.parse(generatedContent as string) as GeneratedContent);
    } catch (error) {
      console.error("Error generating answer:", error);
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

      <button
        onClick={handleGenerateAnswer}
        style={{ marginLeft: "10px", padding: "8px 16px" }}
      >
        Generate Answer
      </button>

      {generatedContent && (
        <div style={{ marginTop: "20px" }}>
          <p>
            <strong>Question:</strong> {generatedContent.question}
          </p>
          <ul>
            {generatedContent.options &&
              Object.entries(generatedContent.options).map(
                ([optionKey, optionText]) => (
                  <li key={optionKey}>
                    {`${optionKey}: ${optionText}`}
                  </li>
                )
              )}
          </ul>
          {generatedContent.correct_answer !== null && (
            <p>
              <strong>Correct Answer:</strong> {generatedContent.correct_answer}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
