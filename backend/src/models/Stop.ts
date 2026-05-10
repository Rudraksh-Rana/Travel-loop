import mongoose, { Schema, Document } from 'mongoose';

export interface IStop extends Document {
  tripId: mongoose.Types.ObjectId;
  cityName: string;
  country: string;
  orderIndex: number;
  arrivalDate: Date;
  departureDate: Date;
}

const StopSchema: Schema = new Schema({
  tripId: { type: Schema.Types.ObjectId, ref: 'Trip', required: true },
  cityName: { type: String, required: true },
  country: { type: String, required: true },
  orderIndex: { type: Number, required: true },
  arrivalDate: { type: Date, required: true },
  departureDate: { type: Date, required: true }
});

export default mongoose.model<IStop>('Stop', StopSchema);
