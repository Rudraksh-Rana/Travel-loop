import express from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import Trip from '../models/Trip';
import BudgetItem from '../models/BudgetItem';
import Activity from '../models/Activity';
import { GoogleGenAI } from '@google/genai';

const router = express.Router();

// Initialize Gemini Client
const ai = process.env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;

// POST /api/ai/query
router.post('/query', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { prompt } = req.body;
    
    // Fetch context for the AI
    const trips = await Trip.find({ userId: req.userId }).select('title startDate endDate status');
    const budgetItems = await BudgetItem.find({ userId: req.userId });
    const totalSpent = budgetItems.reduce((acc, item) => acc + item.amount, 0);
    
    if (ai) {
      // Use Real AI
      const systemPrompt = `You are the Traveloop AI Concierge, a helpful travel assistant.
The user has the following context:
- Total Trips Planned: ${trips.length}
- Upcoming Trips: ${trips.filter(t => (t as any).status === 'upcoming').map(t => t.title).join(', ') || 'None'}
- Total Budget Spent Across All Trips: ₹${totalSpent}
Answer their question concisely and helpfully. Keep answers short (under 3 sentences) unless they ask for an itinerary.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { systemInstruction: systemPrompt },
      });
      
      return res.json({
        answer: response.text || "I couldn't process that request right now.",
        type: 'ai-generated'
      });
    }

    // Fallback if no API key
    const query = prompt.toLowerCase();
    if (query.includes('spent') || query.includes('budget') || query.includes('cost')) {
      return res.json({
        answer: `You have spent a total of ₹${totalSpent.toLocaleString()} across all your trips so far. (Add GEMINI_API_KEY for real AI responses)`,
        type: 'budget'
      });
    }
    if (query.includes('many trips') || query.includes('total trips')) {
      return res.json({
        answer: `You have planned ${trips.length} total expeditions with Traveloop. (Add GEMINI_API_KEY for real AI responses)`,
        type: 'stats'
      });
    }
    res.json({
      answer: "I'm your Travel Concierge. Please add GEMINI_API_KEY to your backend .env file to enable my full AI brain!",
      type: 'info'
    });

  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: 'AI Concierge is currently resting.' });
  }
});

export default router;
