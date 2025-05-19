import axios from 'axios';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export async function fetchLaunchPoem(launchName: string, date: string, rocket: string): Promise<string> {
  if (!OPENAI_API_KEY) throw new Error('OpenAI API key is missing');

  const prompt = `Write a 4-line poem about the space launch mission '${launchName}' scheduled for ${date} using the ${rocket} rocket. Make it inspiring.`;

  const response = await axios.post(
    OPENAI_API_URL,
    {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a poetic assistant.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 80,
      temperature: 0.8
    },
    {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );

  const poem = response.data.choices?.[0]?.message?.content?.trim();
  if (!poem) throw new Error('No poem returned from OpenAI');
  return poem;
} 