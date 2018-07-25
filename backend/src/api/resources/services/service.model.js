import mongoose from 'mongoose';
import { isEmail } from 'validator';

export const schema = {
  am: {
    title: { type: String, maxlength: 200, required: [true, 'service must have a title'] },
    description: { type: String },
    contact: { type: String },
  },
  en: {
    title: { type: String, maxlength: 200, required: [true, 'service must have a title'] },
    description: { type: String },
    contact: { type: String },
  },
  phone: { type: String, required: [true, 'service must have a phone'] },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, 'service must have an email'],
    validate: [isEmail, 'invalid email, enter valid email'],
  },
  adminname: { type: String, required: [true, 'service must have a adminname'], maxlength: 20 },
  date: { type: Date, default: Date.now, index: true },
};

const serviceSchema = new mongoose.Schema(schema);

export const Service = mongoose.model('service', serviceSchema);
