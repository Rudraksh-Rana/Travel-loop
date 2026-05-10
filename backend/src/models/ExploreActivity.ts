import mongoose from 'mongoose';

const exploreActivitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  priceRange: { type: String }, // e.g., "₹₹"
  duration: { type: String }, // e.g., "2-3 hours"
  rating: { type: Number, default: 4.5 },
}, { timestamps: true });

export default mongoose.models.ExploreActivity || mongoose.model('ExploreActivity', exploreActivitySchema);
