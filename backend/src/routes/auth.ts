import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import { generateToken } from '../middleware/auth';

const router = express.Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, city, country, bio } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = new User({
      name,
      email: email.toLowerCase(),
      passwordHash,
      phone,
      city,
      country,
      bio
    });

    await user.save();
    const token = generateToken((user._id as any).toString());

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        photoUrl: user.photoUrl,
        city: user.city,
        country: user.country
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken((user._id as any).toString());

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        photoUrl: user.photoUrl,
        city: user.city,
        country: user.country
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// GET /api/auth/me — get current user from token
router.get('/me', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Not authenticated' });

  try {
    const jwt = await import('jsonwebtoken');
    const token = authHeader.split(' ')[1];
    const decoded = jwt.default.verify(token, process.env.JWT_SECRET || 'traveloop-secret-key-change-in-production') as { userId: string };
    const user = await User.findById(decoded.userId).select('-passwordHash');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      photoUrl: user.photoUrl,
      city: user.city,
      country: user.country
    });
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;
