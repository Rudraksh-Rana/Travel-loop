import mongoose, { Schema, Document } from 'mongoose';

export interface ICommunityPost extends Document {
  tripId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  caption: string;
  likes: number;
}

const CommunityPostSchema: Schema = new Schema({
  tripId: { type: Schema.Types.ObjectId, ref: 'Trip', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  caption: { type: String, required: true },
  likes: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model<ICommunityPost>('CommunityPost', CommunityPostSchema);
