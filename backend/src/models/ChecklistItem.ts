import mongoose, { Schema, Document } from 'mongoose';

export interface IChecklistItem extends Document {
  tripId: mongoose.Types.ObjectId;
  name: string;
  category: string;
  isChecked: boolean;
}

const ChecklistItemSchema: Schema = new Schema({
  tripId: { type: Schema.Types.ObjectId, ref: 'Trip', required: true },
  name: { type: String, required: true },
  category: { type: String, default: 'Miscellaneous' },
  isChecked: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model<IChecklistItem>('ChecklistItem', ChecklistItemSchema);
