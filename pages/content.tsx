import React, { useState, useEffect } from "react";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const Content = () => {
    const [scienceResponses, setScienceResponses] = useState<string[]>([]);
    const [technologyResponses, setTechnologyResponses] = useState<string[]>([]);
    const [engineeringResponses, setEngineeringResponses] = useState<string[]>([]);
    const [mathResponses, setMathResponses] = useState<string[]>([]);
  
    const generateOpenAIResponses = async (prompts: string[]) => {
      try {
        const openaikey = process.env.OPENAI_API_KEY;
        const openai = new OpenAI({
          apiKey: openaikey,
          dangerouslyAllowBrowser: true,
        });
  
        const responses = await Promise.all(
          prompts.map(async (prompt) => {
            const completion = await openai.completions.create({
                model: "gpt-3.5-turbo-1106",
                messages: [
                    { role: 'system', content: 'You are a helpful assistant.' },
                    { role: 'user', content: prompt },
                ],
                max_tokens: 150,
            });
  
            return completion.choices[0]?.text || "";
          })
        );
  
        return responses;
      } catch (error) {
        console.error("Error generating OpenAI responses:", error);
        throw error;
      }
    };
  
    useEffect(() => {
      const sciencePrompts = [
        "Tell me some fun facts about science that an eight year old could understand.",
        // Add more prompts as needed
      ];
  
      const technologyPrompts = [
        "Tell me some fun facts about technology suitable for kids.",
        // Add more prompts as needed
      ];
  
      const engineeringPrompts = [
        "Tell me some fun facts about engineering that kids would enjoy.",
        // Add more prompts as needed
      ];
  
      const mathPrompts = [
        "Tell me some fun math facts for kids.",
        // Add more prompts as needed
      ];
  
      generateOpenAIResponses(sciencePrompts).then((responses) => setScienceResponses(responses));
      generateOpenAIResponses(technologyPrompts).then((responses) => setTechnologyResponses(responses));
      generateOpenAIResponses(engineeringPrompts).then((responses) => setEngineeringResponses(responses));
      generateOpenAIResponses(mathPrompts).then((responses) => setMathResponses(responses));
    }, []);

  return (
    <div>
      <div>
      <div>
        <br />
      <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-600 dark:border-gray-700">
              <div className="flex justify-between items-center mb-5 text-gray-500">
                  <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                  </span>
              </div>
              <h1 className="mb-2 text-4xl font-bold text-green-300 underline-h1">
                <a href="#">Science</a>
              </h1>
              < br />
              <p className="mb-5 text-green-400"> Science is like being a super curious explorer! It's about asking cool questions and doing fun experiments to find out how things work.</p>
              <p className="mb-5 text-white-300"> Imagine you have a magical detective kit, and your mission is to uncover the secrets of the world.
                You can do simple experiments, like making a volcano explode with baking soda and vinegar. It's not just messy fun – it helps you understand why things happen. Science turns everyday stuff into awesome discoveries!
                Think of science as a treasure hunt for knowledge. You get to watch plants grow, make rainbows appear, and listen to the rain's music. It's like having a superpower to reveal the amazing wonders all around you.
                So, put on your explorer hat and get ready for a journey of excitement. Science is your ticket to unraveling the mysteries of the world, and every experiment is a step closer to becoming a fantastic detective of the universe!</p>
            <br />
              <div className="flex justify-between items-center">
                 <div>
                
                 <p className="mb-5 text-font-light text-red-300">{scienceResponses[0]}</p>
                 <p className="mb-5 text-font-light text-yellow-300"> 2. Some flowers change color when you put them in water! It's like they're telling us a secret. Kids can experiment by placing white flowers in different colored water and watch as the petals change hues, showing how plants drink water.</p>
                 <p className="mb-5 text-font-light text-sky-300"> 3. Butterflies undergo an incredible transformation called metamorphosis. They start as caterpillars, form a cozy chrysalis, and then emerge as beautiful butterflies. It's like a magical makeover that happens in nature!</p>
                </div>

                  <a href="#" className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                      Take the Quiz!
                      <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  </a>
              </div>
              <div>
                
              </div>
          </article>   
          </div>             

          <br />

          <div>
            <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-600 dark:border-gray-700">
              <div className="flex justify-between items-center mb-5 text-gray-500">
                  <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                  </span>
              </div>
              <h1 className="mb-2 text-4xl font-bold text-sky-300 underline-h1"><a href="#">Technology</a></h1>
              < br />
              <p className="b-5 text-font-light text-red-300">Technology is like magic that we create! It's all about using tools and machines to make our lives better. 
                Kids can enjoy playing educational games on tablets or computers, learning problem-solving skills while having fun. 
                They can also explore basic coding concepts through games that involve guiding characters through challenges, sparking an interest in technology as a creative tool.</p>
            <br />
              <div className="flex justify-between items-center">
                    <div>
                    <p className="mb-5 text-purple-300"> 1. When you touch your tablet screen, it's like giving it an electric high-five! Your fingers carry a little electricity. The screen has magical sensors that feel this touch and quickly start your favorite games or apps. It's like having a secret conversation with your device!</p>
                    <p className="mb-5 text-orange-300"> 2. Some games use special glasses or your phone camera to bring characters into the real world. It's like magic! Your device blends the virtual and real worlds, making it feel as if dragons and unicorns are right in your living room. Get ready for adventures beyond the screen!</p>
                    <p className="mb-5 text-green-300"> 3. There are apps where animals "talk" back to you! It's like having a chat with digital pets. When you speak or tap, the app's clever technology makes animals respond. It's a fun way to learn about sound and communication while having a virtual conversation with cute creatures!</p> 
                    </div>
                  <a href="#" className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                        Take the Quiz!
                      <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  </a>
              </div>
            </article>   
          </div>        

          <br />

          <div>
            <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-600 dark:border-gray-700">
              <div className="flex justify-between items-center mb-5 text-gray-500">
              </div>
              <h1 className="mb-2 text-4xl font-bold text-red-300 underline-h1"><a href="#">Engineering</a></h1>
              < br />
              <p className="b-5 text-font-light text-white-300">Engineering is building cool stuff! Whether it's constructing a simple bridge with popsicle sticks or designing a paper airplane, you get to use their imagination to create. 
                Engineering is like being a superhero inventor. It's not just about building, but also about solving problems. 
                Kids can have fun building structures with everyday materials, fostering creativity and critical thinking.</p>
            <br />
              <div className="flex justify-between items-center">
                <div>
                <p className="mb-5 text-yellow-300"> 1. Engineers design airplanes, and you can too! Folding paper into different airplane shapes and testing which one flies the farthest is like being an airplane engineer. Kids can have friendly competitions to see whose plane goes the longest distance.</p>
                <p className="mb-5 text-sky-300"> 2. Building towers with colorful blocks is not just fun, it's engineering! Kids can experiment with different block arrangements, learning about balance and stability as they create their mini skyscrapers.</p>
                <p className="mb-5 text-green-300"> 3. Cardboard boxes are like treasure chests for young engineers. They can turn them into forts, cars, or even robots! This activity sparks creativity and teaches kids about the engineering design process.</p>
                </div>
                  <a href="#" className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                  Take the Quiz!
                      <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  </a>
              </div>
            </article>   
          </div>            

          <br />

           <div>
            <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-600 dark:border-gray-700">
              <div className="flex justify-between items-center mb-5 text-gray-500">
              </div>
              <h1 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white underline-h1"><a href="#">Math</a></h1>
              < br />
              <p className="b-5 text-font-light text-sky-300">Math is like a puzzle that helps us solve problems. You can have fun counting their toys, playing with shapes, and solving math puzzles. 
                Understanding math is like having a superpower that helps them organize and make sense of the world. 
                It's not just about numbers; it's about patterns, shapes, and even playing strategic games that involve math concepts.</p>
            <br />
              <div className="flex justify-between items-center">
                <div>
                    <p className="mb-5 text-green-300"> 1. Counting is everywhere, even in toyland! Kids can practice counting their toys or organizing them into groups. It's like a little math party with your favorite playthings.</p>
                    <p className="mb-5 text-yellow-300"> 2. Shapes are like puzzle pieces in the world around us. Kids can go on a shape hunt, finding circles in clocks, squares in books, and triangles in pizza slices. It's a shape-tastic adventure!</p>
                    <p className="mb-5 text-yellow-300"> 3. Turn everyday activities into number stories. For example, if you have three apples and eat one, how many are left? It's like creating your own math adventures with numbers in real life.</p>
                </div>
                  <a href="#" className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                  Take the Quiz!
                      <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  </a>
              </div>
            </article>   
          </div>            
      </div>
    </div>
  );
};

export default Content;