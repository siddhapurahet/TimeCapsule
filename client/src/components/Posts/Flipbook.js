// const axios = require('axios');
require('dotenv').config();
import axios from 'axios';

const HF_API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1";
const HF_API_KEY = process.env.HF_API_KEY;

async function generateText(prompt) {
  try {
    const response = await axios.post(
      HF_API_URL,
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
        },
        timeout: 30000,
      }
    );

    const generated = response.data?.[0]?.generated_text || "No output.";
    // console.log("✨ Generated Text:\n", generated);
    return generated;
  } catch (err) {
    console.error("Error from Hugging Face:", err?.response?.data || err.message);
    return null;
  }
}



async function generateFlipbookContent(posts) {
  const results = [];

  for (const post of posts) {
    const prompt = `You are a creative travel writer. Rewrite this travel post in a vivid, engaging, story-like way:\n\nTitle: ${post.title}\nDescription: ${post.description}`;
    const output = await generateText(prompt);
    results.push({
      original: post,
      enhanced: output,
    });
  }

  return results;
}

module.exports = { generateFlipbookContent };