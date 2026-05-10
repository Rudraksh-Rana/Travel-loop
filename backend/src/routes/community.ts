import express from 'express';
import CommunityPost from '../models/CommunityPost';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// Get all community posts
router.get('/', async (req, res) => {
  try {
    const posts = await CommunityPost.find()
      .populate('userId', 'name')
      .populate('tripId', 'title coverPhotoUrl')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Share a trip to community
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { tripId, caption } = req.body;
    const post = new CommunityPost({
      userId: (req as any).userId,
      tripId,
      caption,
    });
    await post.save();
    
    const populatedPost = await CommunityPost.findById(post._id)
      .populate('userId', 'name')
      .populate('tripId', 'title coverPhotoUrl');
      
    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to share trip' });
  }
});

// Like a post
router.post('/:id/like', authMiddleware, async (req, res) => {
  try {
    const post = await CommunityPost.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    ).populate('userId', 'name').populate('tripId', 'title coverPhotoUrl');
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Like failed' });
  }
});

export default router;
