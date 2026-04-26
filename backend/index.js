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

// Rate Limiting to prevent abuse
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api/', apiLimiter);

// --- API Routes ---

// Chat Route: Handles AI Chat Interactions
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Default system prompt to ensure the AI behaves as "The Sovereign Intelligence Advisor"
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

// Quiz Engine Route: Generates dynamic quiz questions
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
    
    // Parse the JSON response
    const quizData = JSON.parse(response.text);
    res.json(quizData);

  } catch (error) {
    console.error('Quiz Generation Error:', error);
    res.status(500).json({ error: 'Failed to generate quiz question' });
  }
});

// Timeline Engine Route: Generates historical timeline data
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

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Operational', engine: 'ElectionIQ Backend' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Electoral Integrity Engine active on port ${PORT}`);
});
