import mongoose, { Schema, Document } from 'mongoose';

export interface ITrip extends Document {
  userId: string; // Clerk User ID
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  coverPhotoUrl?: string;
  isPublic: boolean;
}

const TripSchema: Schema = new Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  coverPhotoUrl: { type: String },
  isPublic: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model<ITrip>('Trip', TripSchema);
