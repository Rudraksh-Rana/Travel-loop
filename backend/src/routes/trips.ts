import express from 'express';
import Trip from '../models/Trip';
import Stop from '../models/Stop';
import Activity from '../models/Activity';
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

// POST /api/trips — create a new trip
router.post('/', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const newTrip = new Trip({ ...req.body, userId: req.userId });
    const savedTrip = await newTrip.save();
    res.status(201).json(savedTrip);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create trip' });
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
