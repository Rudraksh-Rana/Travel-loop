import express from 'express';
import User from '../models/User';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = express.Router();

// GET /api/users/:id
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-passwordHash');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/users/:id
router.put('/:id', authMiddleware, async (req: AuthRequest, res) => {
  try {
    if (req.userId !== req.params.id) {
      return res.status(403).json({ error: 'Cannot edit another user' });
    }
    const { name, phone, city, country, bio, photoUrl } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, phone, city, country, bio, photoUrl },
      { new: true }
    ).select('-passwordHash');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
});

export default router;
