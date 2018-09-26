import mongoose from 'mongoose';
import { isEmail } from 'validator';

export const schema = {
  sl: {
    title: { type: String, maxlength: 200, required: true },
    description: { type: String },
    contact: { type: String },
  },
  en: {
    title: { type: String, maxlength: 200, required: true },
    description: { type: String },
    contact: { type: String, default: '' },
  },
  phone: { type: String, required: true },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    validate: [isEmail, 'invalid email'],
  },
  adminname: { type: String, required: true, maxlength: 50 },
  date: {
    type: Date,
    default: Date.now,
    required: true,
    index: true,
  },
};

const serviceSchema = new mongoose.Schema(schema);
export const Service = mongoose.model('service', serviceSchema);
