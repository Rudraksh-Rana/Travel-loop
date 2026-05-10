import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  photoUrl?: string;
  phone?: string;
  city?: string;
  country?: string;
  bio?: string;
  role: 'user' | 'admin';
  savedDestinations?: string[];
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  photoUrl: { type: String },
  phone: { type: String },
  city: { type: String },
  country: { type: String, default: 'India' },
  bio: { type: String },
  role: { type: String, default: 'traveler' },
  group: { type: String, default: 'global_travelers' },
  savedDestinations: [{ type: String }]
}, { timestamps: true });

UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

export default mongoose.model<IUser>('User', UserSchema);
