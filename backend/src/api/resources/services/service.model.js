import mongoose from 'mongoose';
import { isEmail } from 'validator';

const required = '~ is required';

export const schema = {
  sl: {
    title: { type: String, maxlength: 200, required: [true, required] },
    description: { type: String },
    contact: { type: String },
  },
  en: {
    title: { type: String, maxlength: 200, required: [true, required] },
    description: { type: String },
    contact: { type: String },
  },
  phone: { type: String, required: [true, required] },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, required],
    validate: [isEmail, '~ invalid email, enter a valid email'],
  },
  adminname: { type: String, required: [true, required], maxlength: 20 },
  date: { type: Date, default: Date.now, index: true },
};

const serviceSchema = new mongoose.Schema(schema);

export const Service = mongoose.model('service', serviceSchema);
