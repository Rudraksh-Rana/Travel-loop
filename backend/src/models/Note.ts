import mongoose, { Schema, Document } from 'mongoose';

export interface INote extends Document {
  tripId: mongoose.Types.ObjectId;
  content: string;
  timestamp: Date;
}

const NoteSchema: Schema = new Schema({
  tripId: { type: Schema.Types.ObjectId, ref: 'Trip', required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model<INote>('Note', NoteSchema);
