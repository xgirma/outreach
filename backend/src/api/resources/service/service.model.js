import mongoose from 'mongoose';
import { isEmail } from 'validator';

export const schema = {
  am: {
    title: { type: String, maxlength: 200 },
    description: { type: String },
    contact: { type: String },
  },
  en: {
    title: { type: String, maxlength: 200 },
    description: { type: String },
    contact: { type: String },
  },
  phone: { type: String, required: [true, 'Info must have a phone'] },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, 'Info must have an email'],
    validate: [isEmail, 'Invalid email'],
  },
};

const serviceSchema = new mongoose.Schema(schema);

export const Service = mongoose.model('service', serviceSchema);
