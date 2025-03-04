// Puppeteer scrapes the webpage and extracts text from <p> tags.
// The extracted text is sent to OpenAI GPT-4 Turbo for classification.
// GPT returns only the category name (e.g., Technology, News).
// The program logs the category to the console.



const puppeteer = require('puppeteer');
const { OpenAI } = require('openai');
//Storing API keys in .env prevents security risks. Create a .env file in your project and add
require('dotenv').config(); // For storing API keys safely

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Store API key in .env file
});
  