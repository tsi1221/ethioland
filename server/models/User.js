import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  phone:    { type: String, required: true },
  passwordHash: { type: String, required: true },
  role:     { type: String, enum: ['admin', 'buyer', 'seller', 'agent'], default: 'buyer' },
  nationalId: String,
  kebeleId:   String,
  profilePhotoUrl: String,
}, { timestamps: true });

export default mongoose.model('User', userSchema);
