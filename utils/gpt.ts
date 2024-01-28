import openai from 'openai';

const apiKey = process.env.OPENAI_API_KEY;

const openaiInstance = new openai({
  apiKey: apiKey,
});

export default openaiInstance;
