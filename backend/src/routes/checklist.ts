import express from 'express';
import ChecklistItem from '../models/ChecklistItem';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// GET /api/checklist/trip/:tripId
router.get('/trip/:tripId', authMiddleware, async (req, res) => {
  try {
    const items = await ChecklistItem.find({ tripId: req.params.tripId });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/checklist
router.post('/', authMiddleware, async (req, res) => {
  try {
    const item = new ChecklistItem(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create checklist item' });
  }
});

// PATCH /api/checklist/:id  — toggle checked
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const item = await ChecklistItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
});

// DELETE /api/checklist/:id
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await ChecklistItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Checklist item deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

export default router;
