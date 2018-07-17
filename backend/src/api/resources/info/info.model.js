import mongoose from 'mongoose';
import { isEmail } from 'validator';

export const schema = {
  am: {
    name: { type: String, required: [true, 'info must have a church name'], maxlength: 200 },
    denomination: {
      type: String,
      required: [true, 'info must have a denomination'],
      maxlength: 100,
    },
    bible: {
      verse: { type: String, required: [true, 'info must have a bible verse'], maxlength: 1000 },
      from: { type: String, required: [true, 'info must have a bible verse from'], maxlength: 100 },
    },
  },
  en: {
    name: { type: String, required: [true, 'info must have a church name'], maxlength: 200 },
    denomination: {
      type: String,
      required: [true, 'info must have a denomination'],
      maxlength: 100,
    },
    bible: {
      verse: { type: String, required: [true, 'info must have a bible verse'], maxlength: 1000 },
      from: { type: String, required: [true, 'info must have a bible verse from'], maxlength: 100 },
    },
  },
  phone: { type: String, required: [true, 'info must have a phone'] },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, 'info must have an email'],
    validate: [isEmail, 'Invalid email'],
  },
  address: {
    street: { type: String, required: [true, 'info must have a street'], maxlength: 200 },
    city: { type: String, required: [true, 'info must have a city'], maxlength: 50 },
    state: { type: String, maxlength: 50 },
    zip: { type: String, maxlength: 50 },
    country: { type: String, required: [true, 'info must have a country'], maxlength: 100 },
  },
  adminname: { type: String, required: [true, 'info must have a adminname'], maxlength: 20 },
  date: { type: Date, default: Date.now, index: true },
};

const infoSchema = new mongoose.Schema(schema);

export const Info = mongoose.model('info', infoSchema);
