import mongoose from 'mongoose';
import { isEmail } from 'validator';

const required = '~ is required';

export const schema = {
  sl: {
    name: { type: String, required: [true, required], maxlength: 200 },
    denomination: {
      type: String,
      required: [true, required],
      maxlength: 100,
    },
    bible: {
      verse: { type: String, required: [true, required], maxlength: 1000 },
      from: { type: String, required: [true, required], maxlength: 100 },
    },
  },
  en: {
    name: { type: String, required: [true, required], maxlength: 200 },
    denomination: {
      type: String,
      required: [true, required],
      maxlength: 100,
    },
    bible: {
      verse: { type: String, required: [true, required], maxlength: 1000 },
      from: { type: String, required: [true, required], maxlength: 100 },
    },
  },
  phone: { type: String, required: [true, required] },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, required],
    validate: [isEmail, 'Invalid email'],
  },
  address: {
    street: { type: String, required: [true, required], maxlength: 200 },
    city: { type: String, required: [true, required], maxlength: 50 },
    state: { type: String, maxlength: 50 },
    zip: { type: String, maxlength: 50 },
    country: { type: String, required: [true, required], maxlength: 100 },
  },
  adminname: { type: String, required: [true, required], maxlength: 20 },
  date: { type: Date, default: Date.now, index: true },
};

const infoSchema = new mongoose.Schema(schema);

export const Info = mongoose.model('info', infoSchema);
