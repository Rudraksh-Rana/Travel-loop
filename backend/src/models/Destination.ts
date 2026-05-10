import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  state: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  tags: [{ type: String }],
  bestTimeToVisit: { type: String },
  rating: { type: Number, default: 4.5 },
}, { timestamps: true });

export default mongoose.models.Destination || mongoose.model('Destination', destinationSchema);
