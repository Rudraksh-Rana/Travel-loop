import express from 'express';
import axios from 'axios';
import Destination from '../models/Destination';
import ExploreActivity from '../models/ExploreActivity';

const router = express.Router();

// Search destinations
router.get('/destinations', async (req, res) => {
  try {
    const { q } = req.query;
    let destinations = await Destination.find(q ? {
      $or: [
        { name: { $regex: q as string, $options: 'i' } },
        { state: { $regex: q as string, $options: 'i' } },
        { tags: { $in: [new RegExp(q as string, 'i')] } }
      ]
    } : {}).limit(20);

    // Fallback to Wikipedia API if no results found in DB and a search term is provided
    if (destinations.length === 0 && q) {
      try {
        const wikiRes = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(q as string)}`);
        if (wikiRes.data && wikiRes.data.extract) {
          destinations = [{
            name: wikiRes.data.title,
            description: wikiRes.data.extract,
            category: 'Discovery',
            rating: 4.5,
            image: wikiRes.data.thumbnail?.source || 'https://images.unsplash.com/photo-1524492459416-81446b1f315e',
            isWikipedia: true
          }] as any;
        }
      } catch (e) {
        // Wikipedia page not found, silent fail
      }
    }
    
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
