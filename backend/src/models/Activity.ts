import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  stopId: mongoose.Types.ObjectId;
  title: string;
  type: string;
  cost: number;
  duration: number; // in minutes
  startTime?: Date;
  orderIndex: number;
}

const ActivitySchema: Schema = new Schema({
  stopId: { type: Schema.Types.ObjectId, ref: 'Stop', required: true },
  title: { type: String, required: true },
  type: { type: String, required: true },
  cost: { type: Number, default: 0 },
  duration: { type: Number, required: true },
  startTime: { type: Date },
  orderIndex: { type: Number, default: 0 }
});

export default mongoose.model<IActivity>('Activity', ActivitySchema);
