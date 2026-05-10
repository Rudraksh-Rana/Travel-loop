import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import tripRoutes from './routes/trips';
import stopRoutes from './routes/stops';
import noteRoutes from './routes/notes';
import budgetRoutes from './routes/budget';
import checklistRoutes from './routes/checklist';
import communityRoutes from './routes/community';
import exploreRoutes from './routes/explore';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/stops', stopRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/budget', budgetRoutes);
app.use('/api/checklist', checklistRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/explore', exploreRoutes);

// Health check
app.get('/api/health', (_, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/traveloop';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });
