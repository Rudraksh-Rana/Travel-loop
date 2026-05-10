import express from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import Trip from '../models/Trip';
import BudgetItem from '../models/BudgetItem';
import Activity from '../models/Activity';

const router = express.Router();

// POST /api/ai/query
router.post('/query', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { prompt } = req.body;
    const query = prompt.toLowerCase();

    // ── Simple Natural Language Engine (NLQ) ──────────────────
    // This can be replaced with a real LLM (OpenAI/Gemini) API call
    
    // Pattern 1: Budget Query
    if (query.includes('spent') || query.includes('budget') || query.includes('cost')) {
      const budgetItems = await BudgetItem.find({ userId: req.userId });
      const total = budgetItems.reduce((acc, item) => acc + item.amount, 0);
      
      return res.json({
        answer: `You have spent a total of ₹${total.toLocaleString()} across all your trips so far.`,
        data: budgetItems,
        type: 'budget'
      });
    }

    // Pattern 2: Trip Count
    if (query.includes('many trips') || query.includes('total trips')) {
      const count = await Trip.countDocuments({ userId: req.userId });
      return res.json({
        answer: `You have planned ${count} total expeditions with Traveloop.`,
        data: { count },
        type: 'stats'
      });
    }

    // Pattern 3: Itinerary / Plans
    if (query.includes('plan') || query.includes('doing next') || query.includes('activities')) {
      const activities = await Activity.find().limit(5); // In a real app, we'd filter by user's next trip
      return res.json({
        answer: "Based on your upcoming schedule, you have some exciting sightseeing and dining activities planned.",
        data: activities,
        type: 'itinerary'
      });
    }

    // Default response
    res.json({
      answer: "I'm your Travel Concierge. I can help you track your budget, count your trips, or check your schedule. Try asking 'How much have I spent?'",
      type: 'info'
    });

  } catch (error) {
    res.status(500).json({ error: 'AI Concierge is currently resting.' });
  }
});

export default router;
