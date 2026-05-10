import express from 'express';
import axios from 'axios';
import Trip from '../models/Trip';
import Stop from '../models/Stop';
import Activity from '../models/Activity';
import BudgetItem from '../models/BudgetItem';
import ExploreActivity from '../models/ExploreActivity';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = express.Router();

// GET /api/trips — get all trips for the authenticated user
router.get('/', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const trips = await Trip.find({ userId: req.userId }).sort('-createdAt');
    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/trips — create a new trip and auto-populate with real data
router.post('/', authMiddleware, async (req: AuthRequest, res) => {
    const { title, startDate, endDate } = req.body;
    if (!title || !startDate || !endDate) {
      return res.status(400).json({ error: 'Title, startDate, and endDate are required' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ error: 'Invalid date format' });
    }

    try {
      const newTrip = new Trip({ ...req.body, userId: req.userId });
      const savedTrip = await newTrip.save();

    // AUTO-POPULATION LOGIC
    // Extract city from title (e.g. "Expedition to Jaipur" -> "Jaipur")
    const cityMatch = title.match(/(?:to|in|at|for)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i);
    let cityName = cityMatch ? cityMatch[1] : null;

    // Fallback: if no city in title, maybe use description or just default to a popular one for data demo
    if (!cityName) cityName = "India";

    // Calculate total days
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    // Limit diffDays to prevent accidental infinite loops or excessive data creation
    const safeDiffDays = Math.min(diffDays, 30);

    // Fetch "real world" base data for this city
    let localActivities = await ExploreActivity.find({
      location: { $regex: cityName, $options: 'i' }
    });

    // If we don't have enough data, discover via Wikipedia
    if (localActivities.length < safeDiffDays * 2) {
      try {
        const wikiRes = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cityName)}`);
        if (wikiRes.data && wikiRes.data.extract) {
          const genericSpots = ['Heritage District', 'Cultural Center', 'Local Bazaar', 'Nature Park', 'Historic Fort', 'Skyline View'];
          for (const spot of genericSpots) {
            const exists = localActivities.find(a => a.title.includes(spot));
            if (!exists) {
              const newExp = new ExploreActivity({
                title: `${cityName} ${spot}`,
                location: `${cityName}, India`,
                category: 'Sightseeing',
                description: `A significant landmark in ${cityName}. ${wikiRes.data.extract.substring(0, 100)}...`,
                image: wikiRes.data.thumbnail?.source || 'https://images.unsplash.com/photo-1524492459416-81446b1f315e',
                priceRange: '₹₹',
                duration: '2 hours',
                rating: 4.5
              });
              const savedExp = await newExp.save();
              localActivities.push(savedExp);
            }
          }
        }
      } catch (e: any) {
        console.error('Wiki fetch failed for', cityName, ':', e.message);
      }
    }

    // FINAL FALLBACK: If still no activities, add hardcoded generic ones to prevent division by zero
    if (localActivities.length === 0) {
      localActivities = [{
        title: `${cityName} Exploration`,
        category: 'Sightseeing',
        priceRange: '₹₹',
        location: cityName
      } as any];
    }

    // Create one STOP per DAY
    let activityCounter = 0;
    for (let day = 0; day < safeDiffDays; day++) {
      const stopDate = new Date(start);
      stopDate.setDate(start.getDate() + day);

      const stop = new Stop({
        tripId: savedTrip._id,
        cityName: cityName,
        country: 'India',
        orderIndex: day,
        arrivalDate: stopDate,
        departureDate: stopDate
      });
      await stop.save();

      // Add 2 unique activities to this specific day
      for (let i = 0; i < 2; i++) {
        const exp = localActivities[activityCounter % localActivities.length];
        activityCounter++;

        const startTime = new Date(stopDate);
        startTime.setHours(10 + (i * 4), 0, 0, 0);

        let durationMin = 120;
        let cost = exp.priceRange === '₹₹₹' ? 2500 : (exp.priceRange === '₹₹' ? 800 : 200);

        const activity = new Activity({
          stopId: stop._id,
          title: exp.title || `${cityName} Exploration`,
          type: exp.category || 'Sightseeing',
          cost: cost,
          duration: durationMin,
          startTime: startTime,
          orderIndex: i
        });
        await activity.save();

        // Add to Budget
        if (cost > 0) {
          await new BudgetItem({
            tripId: savedTrip._id,
            category: 'Activities',
            description: `Day ${day + 1}: ${exp.title}`,
            amount: cost,
            qty: 1
          }).save();
        }
      }
    }

    res.status(201).json(savedTrip);
  } catch (error: any) {
    console.error('Trip creation error:', error);
    res.status(500).json({ error: error.message || 'Failed to create trip' });
  }
});

// GET /api/trips/:id — get a trip with its stops and activities
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ error: 'Trip not found' });
    
    const stops = await Stop.find({ tripId: trip._id }).sort('orderIndex');
    const stopsWithActivities = await Promise.all(
      stops.map(async (stop) => {
        const activities = await Activity.find({ stopId: stop._id });
        return { ...stop.toObject(), activities };
      })
    );
    
    res.json({ trip, stops: stopsWithActivities });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/trips/:id — update a trip
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!trip) return res.status(404).json({ error: 'Trip not found' });
    res.json(trip);
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
});

// DELETE /api/trips/:id — delete a trip and all related data
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const tripId = req.params.id;
    const stops = await Stop.find({ tripId });
    
    // Delete all activities for all stops
    for (const stop of stops) {
      await Activity.deleteMany({ stopId: stop._id });
    }
    
    // Delete all stops, then the trip
    await Stop.deleteMany({ tripId });
    await Trip.findByIdAndDelete(tripId);
    
    res.json({ message: 'Trip deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

// POST /api/trips/:id/stops — add a stop to a trip
router.post('/:id/stops', authMiddleware, async (req, res) => {
  try {
    const stop = new Stop({ ...req.body, tripId: req.params.id });
    await stop.save();
    res.status(201).json(stop);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add stop' });
  }
});

// PUT /api/trips/stops/:stopId — update a stop
router.put('/stops/:stopId', authMiddleware, async (req, res) => {
  try {
    const stop = await Stop.findByIdAndUpdate(req.params.stopId, req.body, { new: true });
    res.json(stop);
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
});

// DELETE /api/trips/stops/:stopId
router.delete('/stops/:stopId', authMiddleware, async (req, res) => {
  try {
    await Activity.deleteMany({ stopId: req.params.stopId });
    await Stop.findByIdAndDelete(req.params.stopId);
    res.json({ message: 'Stop deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

// GET /api/trips/public/:id — get a public trip (no auth required)
router.get('/public/:id', async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip || !trip.isPublic) {
      return res.status(404).json({ error: 'Trip not found or not public' });
    }
    
    const stops = await Stop.find({ tripId: trip._id }).sort('orderIndex');
    const stopsWithActivities = await Promise.all(
      stops.map(async (stop) => {
        const activities = await Activity.find({ stopId: stop._id });
        return { ...stop.toObject(), activities };
      })
    );
    
    res.json({ trip, stops: stopsWithActivities });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
