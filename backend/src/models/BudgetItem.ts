import mongoose, { Schema, Document } from 'mongoose';

export interface IBudgetItem extends Document {
  tripId: mongoose.Types.ObjectId;
  category: string;
  description: string;
  amount: number;
  qty: number;
}

const BudgetItemSchema: Schema = new Schema({
  tripId: { type: Schema.Types.ObjectId, ref: 'Trip', required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  qty: { type: Number, default: 1 }
}, { timestamps: true });

export default mongoose.model<IBudgetItem>('BudgetItem', BudgetItemSchema);
