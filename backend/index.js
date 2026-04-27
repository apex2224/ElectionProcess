/**
 * @file index.js
 * @description ElectionIQ Backend — The Sovereign Intelligence Engine.
 * Provides REST API endpoints for AI-powered civic chat, quiz generation,
 * and election timeline data using Google Gemini.
 * @module ElectionIQBackend
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Gemini Client
// Ensure you have GEMINI_API_KEY in your .env file
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Middleware
app.use(cors());
app.use(express.json());

/**
 * Rate limiter middleware to protect API routes from abuse.
 * Limits each IP to 100 requests per 15-minute window.
 */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api/', apiLimiter);

// --- API Routes ---

/**
 * @route POST /api/chat
 * @description Handles AI-powered civic chat queries via Google Gemini.
 * The AI is constrained to act as the ElectionIQ Intelligence Engine,
 * providing unbiased and factual responses about the Indian electoral process.
 * @param {object} req.body - The request body.
 * @param {string} req.body.message - The user's chat query.
 * @param {Array}  [req.body.history] - Optional conversation history.
 * @returns {object} JSON object with `reply` string from the AI.
 */
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // System prompt constrains AI to act as the Sovereign Intelligence Advisor
    const systemInstruction = `You are the "ElectionIQ Intelligence Engine", also known as "The Sovereign Intelligence Advisor". 
    You are a premium, highly knowledgeable, and authoritative AI assistant that answers questions regarding the electoral process, civic duties, and election analytics.
    Speak in a formal, precise, and tech-forward tone. Do not hallucinate data.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
            { role: 'user', parts: [{ text: systemInstruction }] },
            { role: 'model', parts: [{ text: 'Understood. I am online and ready to assist.' }] },
            { role: 'user', parts: [{ text: message }] }
        ],
        config: {
            temperature: 0.3, // Low temperature for more factual responses
        }
    });

    res.json({ reply: response.text });
  } catch (error) {
    console.error('Chat AI Error:', error);
    res.status(500).json({ error: 'Failed to process AI request' });
  }
});

/**
 * @route POST /api/quiz/generate
 * @description Dynamically generates a multiple-choice civic quiz question
 * using Google Gemini. Returns the question, options, correct answer, and
 * an explanation.
 * @param {object} req.body - The request body.
 * @param {string} [req.body.topic='electoral process'] - The topic for the quiz question.
 * @returns {object} JSON object with `question`, `options`, `correctAnswer`, `explanation`.
 */
app.post('/api/quiz/generate', async (req, res) => {
  try {
    const { topic = 'electoral process' } = req.body;

    const prompt = `Generate a multiple choice question about the following civic topic: ${topic}.
    Return the result strictly as a JSON object with the following structure:
    {
      "question": "The question text",
      "options": ["A: option text", "B: option text", "C: option text", "D: option text"],
      "correctAnswer": "The exact string of the correct option",
      "explanation": "Brief explanation of why it is correct"
    }`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            temperature: 0.7,
        }
    });

    // Parse and return the JSON response
    const quizData = JSON.parse(response.text);
    res.json(quizData);

  } catch (error) {
    console.error('Quiz Generation Error:', error);
    res.status(500).json({ error: 'Failed to generate quiz question' });
  }
});

/**
 * @route POST /api/timeline
 * @description Generates a structured election timeline for a given year and region
 * using Google Gemini with historical accuracy constraints.
 * @param {object} req.body - The request body.
 * @param {string} req.body.year - The election year (e.g., "2024").
 * @param {string} req.body.region - The election region (e.g., "Lok Sabha", "Uttar Pradesh").
 * @returns {object} JSON object with `title`, `subtitle`, and an `events` array.
 */
app.post('/api/timeline', async (req, res) => {
  try {
    const { year, region } = req.body;

    if (!year || !region) {
      return res.status(400).json({ error: 'Year and region are required' });
    }

    const prompt = `You are a strict Indian political historian. The user is asking for the election timeline of the ${region} election in the year ${year}.
    If there was no significant election in that region during that year, provide a brief timeline explaining the political context of that year.
    Generate a JSON object representing the election cycle. 
    It MUST have this exact structure:
    {
      "title": "Short title, e.g., Lok Sabha 1951 or Uttar Pradesh 2022",
      "subtitle": "Short subtitle explaining the significance or winner",
      "events": [
        { 
          "date": "Short date, e.g., Mar 16", 
          "icon": "One of these material symbols: campaign, how_to_vote, fact_check, record_voice_over, leaderboard", 
          "title": "Event Title", 
          "desc": "Short description of the event" 
        }
      ]
    }
    Provide exactly 4 to 6 events in chronological order. Ensure the response is valid JSON and nothing else.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            temperature: 0.2, // Low temperature for historical accuracy
        }
    });

    const timelineData = JSON.parse(response.text);
    res.json(timelineData);

  } catch (error) {
    console.error('Timeline Generation Error:', error);
    res.status(500).json({ error: 'Failed to generate timeline data' });
  }
});

/**
 * @route GET /health
 * @description Health check endpoint to verify the service is running.
 * @returns {object} JSON object with `status` and `engine` fields.
 */
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Operational', engine: 'ElectionIQ Backend' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Electoral Integrity Engine active on port ${PORT}`);
});
