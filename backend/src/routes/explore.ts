import express from 'express';
import Destination from '../models/Destination';
import ExploreActivity from '../models/ExploreActivity';

const router = express.Router();

// Search destinations
router.get('/destinations', async (req, res) => {
  try {
    const { q } = req.query;
    const query = q ? {
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { state: { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q as string, 'i')] } }
      ]
    } : {};
    
    const destinations = await Destination.find(query).limit(20);
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Search activities
router.get('/activities', async (req, res) => {
  try {
    const { q } = req.query;
    const query = q ? {
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { location: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } }
      ]
    } : {};
    
    const activities = await ExploreActivity.find(query).limit(20);
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
