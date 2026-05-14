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

// Live Flights Hook (e.g., Amadeus / Skyscanner Bridge)
router.get('/flights', async (req, res) => {
  try {
    const { origin, destination, date } = req.query;
    
    // In a production environment, this is where you would call:
    // const amadeusRes = await axios.get(`https://test.api.amadeus.com/v2/shopping/flight-offers?...`)
    // For now, we simulate a Live API response based on the search
    
    if (!origin || !destination || !date) {
      return res.status(400).json({ error: 'Origin, destination, and date are required.' });
    }

    const mockFlights = [
      {
        id: 'FL-001',
        airline: 'Air India',
        flightNumber: 'AI 101',
        departureTime: '06:30 AM',
        arrivalTime: '08:45 AM',
        duration: '2h 15m',
        price: Math.floor(Math.random() * 5000) + 3000, // Dynamic pricing simulation
        status: 'On Time'
      },
      {
        id: 'FL-002',
        airline: 'IndiGo',
        flightNumber: '6E 404',
        departureTime: '11:00 AM',
        arrivalTime: '01:05 PM',
        duration: '2h 05m',
        price: Math.floor(Math.random() * 5000) + 2500,
        status: 'Delayed'
      }
    ];

    res.json(mockFlights);
  } catch (error) {
    res.status(500).json({ error: 'Flight API currently unavailable' });
  }
});

export default router;
