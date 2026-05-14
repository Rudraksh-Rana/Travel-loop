import express from 'express';
import Stop from '../models/Stop';
import Activity from '../models/Activity';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// Helper to emit to trip room
async function emitToTrip(req: any, stopId: string, event: string, payload: any) {
  const io = req.app.get('io');
  if (io) {
    const stop = await Stop.findById(stopId);
    if (stop) {
      io.to(`trip_${stop.tripId}`).emit(event, payload);
    }
  }
}

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
    if (!req.body.title) {
      return res.status(400).json({ error: 'Activity title is required' });
    }
    const activity = new Activity({ 
      ...req.body, 
      stopId: req.params.stopId,
      orderIndex: count
    });
    await activity.save();
    
    await emitToTrip(req, req.params.stopId as string, 'activity_updated', { action: 'add', stopId: req.params.stopId as string, activity });
    
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
    
    // We assume all reordered activities belong to same stop for simplicity
    if (activities.length > 0) {
      const act = await Activity.findById(activities[0].id);
      if (act) {
        await emitToTrip(req, act.stopId.toString(), 'activity_updated', { action: 'reorder', stopId: act.stopId.toString() });
      }
    }
    
    res.json({ message: 'Reordered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Reorder failed' });
  }
});

// PUT /api/stops/activities/:id
router.put('/activities/:id', authMiddleware, async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (activity) {
      await emitToTrip(req, activity.stopId.toString(), 'activity_updated', { action: 'update', stopId: activity.stopId.toString(), activity });
    }
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
});

// DELETE /api/stops/activities/:id
router.delete('/activities/:id', authMiddleware, async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (activity) {
      await emitToTrip(req, activity.stopId.toString(), 'activity_updated', { action: 'delete', stopId: activity.stopId.toString(), activityId: req.params.id });
    }
    res.json({ message: 'Activity deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

export default router;
