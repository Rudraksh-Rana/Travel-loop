import express from 'express';
import Note from '../models/Note';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = express.Router();

// GET /api/notes/all — all notes for user
router.get('/all', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const notes = await Note.find({ userId: req.userId }).sort('-createdAt');
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/notes/trip/:tripId
router.get('/trip/:tripId', authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({ tripId: req.params.tripId }).sort('-timestamp');
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/notes
router.post('/', authMiddleware, async (req, res) => {
  try {
    const note = new Note(req.body);
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create note' });
  }
});

// PUT /api/notes/:id
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
});

// DELETE /api/notes/:id
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

export default router;
