const express = require('express');
const { GoogleGenAI } = require('@google/genai');
const router = express.Router();

const PRIMARY_MODEL = 'gemini-2.5-flash';

const SYSTEM_INSTRUCTION = `You are a friendly AI doubt assistant for the "AI Career Accelerator" course.
Your job is to help students and potential enrollees with their questions.

Course details:
- Price: ₹5,999 (one-time, lifetime access). Original price ₹14,999 (60% off).
- 15+ hours of self-paced content
- 100+ AI tools covered (ChatGPT, Midjourney, Zapier, Make, etc.)
- 5 structured learning phases
- Monthly live Q&A sessions
- Private Discord community (5,000+ members)
- Certificate of completion
- Resume & career guidance module
- 30-day money-back guarantee
- Payment via Razorpay, UPI, Cards, Net Banking, or WhatsApp/Bank Transfer
- WhatsApp support: +91 83603 41355

Keep answers concise, warm, and encouraging. If asked something outside the course scope, gently redirect.`;

// POST /api/chat — main chat endpoint
router.post('/', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  if (!process.env.GEMINI_API_KEY) {
    console.error('[chat] GEMINI_API_KEY is not set');
    return res.status(503).json({ error: 'Chat is not configured. Please contact us on WhatsApp!' });
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const contents = messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  try {
    const response = await ai.models.generateContent({
      model: PRIMARY_MODEL,
      contents,
      config: { systemInstruction: SYSTEM_INSTRUCTION },
    });

    return res.json({ reply: response.text });

  } catch (err) {
    // Full diagnostic log
    const status  = err?.status ?? err?.error?.code ?? 'unknown';
    const message = err?.message ?? 'No message';
    console.error('[chat] Gemini API error');
    console.error('  model  :', PRIMARY_MODEL);
    console.error('  status :', status);
    console.error('  message:', message);
    try { console.error('  body   :', JSON.stringify(err?.error ?? err, null, 2)); } catch (_) {}

    // Send the real error reason to the frontend
    const userMessage = status === 429
      ? "I'm a bit busy right now 😅 Please try again in a moment, or reach us on WhatsApp: +91 83603 41355"
      : `Something went wrong (${status}). Please try again or contact us on WhatsApp: +91 83603 41355`;

    return res.status(typeof status === 'number' ? status : 500).json({ error: userMessage });
  }
});

// GET /api/chat/test — lists available models + sends a Hello prompt
router.get('/test', async (req, res) => {
  if (!process.env.GEMINI_API_KEY) {
    return res.status(503).json({ error: 'GEMINI_API_KEY not set' });
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const result = { keyPrefix: process.env.GEMINI_API_KEY.slice(0, 8) + '...', models: [], hello: null, error: null };

  // List models
  try {
    const iter = await ai.models.list();
    for await (const m of iter) {
      if (m.name.includes('gemini')) result.models.push(m.name);
    }
  } catch (e) {
    result.error = `list models failed: ${e.message}`;
    return res.json(result);
  }

  // Hello probe
  try {
    const response = await ai.models.generateContent({
      model: PRIMARY_MODEL,
      contents: 'Say hello in one sentence.',
    });
    result.hello = response.text;
  } catch (e) {
    result.error = `generateContent failed on ${PRIMARY_MODEL}: status=${e?.status} msg=${e?.message}`;
  }

  return res.json(result);
});

module.exports = router;
