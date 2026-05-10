import express from 'express';
import Stop from '../models/Stop';
import Activity from '../models/Activity';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// GET /api/stops/:stopId/activities
router.get('/:stopId/activities', authMiddleware, async (req, res) => {
  try {
    const activities = await Activity.find({ stopId: req.params.stopId }).sort('orderIndex');
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/stops/:stopId/activities
router.post('/:stopId/activities', authMiddleware, async (req, res) => {
  try {
    const count = await Activity.countDocuments({ stopId: req.params.stopId });
    const activity = new Activity({ 
      ...req.body, 
      stopId: req.params.stopId,
      orderIndex: count
    });
    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create activity' });
  }
});

// PUT /api/stops/activities/reorder
router.put('/activities/reorder', authMiddleware, async (req, res) => {
  try {
    const { activities } = req.body; // Array of { id, orderIndex }
    const updates = activities.map((a: any) => 
      Activity.findByIdAndUpdate(a.id, { orderIndex: a.orderIndex })
    );
    await Promise.all(updates);
    res.json({ message: 'Reordered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Reorder failed' });
  }
});

// PUT /api/stops/activities/:id
router.put('/activities/:id', authMiddleware, async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
});

// DELETE /api/stops/activities/:id
router.delete('/activities/:id', authMiddleware, async (req, res) => {
  try {
    await Activity.findByIdAndDelete(req.params.id);
    res.json({ message: 'Activity deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

export default router;
