import mongoose from 'mongoose';
import { isEmail } from 'validator';

const schema = {
  sl: {
    name: { type: String, required: true, maxlength: 200 },
    denomination: {
      type: String,
      required: true,
      maxlength: 100,
    },
    bible: {
      verse: { type: String, required: true, maxlength: 1000 },
      from: { type: String, required: true, maxlength: 100 },
    },
  },
  en: {
    name: { type: String, required: true, maxlength: 200 },
    denomination: {
      type: String,
      required: true,
      maxlength: 100,
    },
    bible: {
      verse: { type: String, required: true, maxlength: 1000 },
      from: { type: String, required: true, maxlength: 100 },
    },
  },
  phone: { type: String, required: true },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    validate: [isEmail, 'invalid email'],
  },
  address: {
    street: { type: String, required: true, maxlength: 200 },
    city: { type: String, required: true, maxlength: 50 },
    state: { type: String, maxlength: 50, default: '' },
    zip: { type: String, maxlength: 50, default: '' },
    country: { type: String, required: true, maxlength: 100 },
  },
  adminname: { type: String, required: true, maxlength: 50 },
  date: {
    type: Date,
    default: Date.now,
    required: true,
    index: true,
  },
};

const infoSchema = new mongoose.Schema(schema);
const Info = mongoose.model('info', infoSchema);

export default Info;
