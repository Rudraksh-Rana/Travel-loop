import express from 'express';
import BudgetItem from '../models/BudgetItem';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// GET /api/budget/trip/:tripId
router.get('/trip/:tripId', authMiddleware, async (req, res) => {
  try {
    const items = await BudgetItem.find({ tripId: req.params.tripId });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/budget
router.post('/', authMiddleware, async (req, res) => {
  try {
    const item = new BudgetItem(req.body);
    await item.save();
    
    // Emit event to all clients in the trip room
    const io = req.app.get('io');
    if (io) {
      io.to(`trip_${item.tripId}`).emit('budget_updated', { action: 'add', item });
    }
    
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create budget item' });
  }
});

// DELETE /api/budget/:id
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const item = await BudgetItem.findByIdAndDelete(req.params.id);
    if (item) {
      // Emit event to all clients in the trip room
      const io = req.app.get('io');
      if (io) {
        io.to(`trip_${item.tripId}`).emit('budget_updated', { action: 'delete', itemId: req.params.id });
      }
    }
    res.json({ message: 'Budget item deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

export default router;
