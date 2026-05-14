import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';

import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import tripRoutes from './routes/trips';
import stopRoutes from './routes/stops';
import noteRoutes from './routes/notes';
import budgetRoutes from './routes/budget';
import checklistRoutes from './routes/checklist';
import communityRoutes from './routes/community';
import exploreRoutes from './routes/explore';
import aiRoutes from './routes/ai';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  }
});

app.use(cors());
app.use(express.json());

// Expose io to routes
app.set('io', io);

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
app.use('/api/ai', aiRoutes);

// Health check
app.get('/api/health', (_, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  // User joins a specific trip room
  socket.on('join_trip', (tripId) => {
    socket.join(`trip_${tripId}`);
    console.log(`Socket ${socket.id} joined trip ${tripId}`);
  });

  socket.on('leave_trip', (tripId) => {
    socket.leave(`trip_${tripId}`);
    console.log(`Socket ${socket.id} left trip ${tripId}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/traveloop';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    httpServer.listen(port, () => {
      console.log(`Server running on port ${port} with Socket.IO enabled`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });
