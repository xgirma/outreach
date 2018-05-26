import mongoose from 'mongoose';
import { isEmail } from 'validator';

export const schema = {
  _id: {
    type: Number,
    default: 100,
  },
  am: {
    title: { type: String, maxlength: 200 },
    date: {
      from: { type: String },
      to: { type: String },
    },
    description: { type: String },
    address: {
      street: { type: String, required: [true, 'Event must have a street'], maxlength: 200 },
      city: { type: String, required: [true, 'Event must have a city'], maxlength: 50 },
      state: { type: String, maxlength: 50 },
      zip: { type: String, maxlength: 50 },
      country: { type: String, required: [true, 'Event must have a country'], maxlength: 100 },
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'Event must have an email'],
      validate: [isEmail, 'Invalid email'],
    },
    phone: { type: String, required: [true, 'Event must have a phone'] },
  },
  en: {
    title: { type: String, maxlength: 200 },
    date: {
      from: { type: String },
      to: { type: String },
    },
    description: { type: String },
    address: {
      street: { type: String, required: [true, 'Event must have a street'], maxlength: 200 },
      city: { type: String, required: [true, 'Event must have a city'], maxlength: 50 },
      state: { type: String, maxlength: 50 },
      zip: { type: String, maxlength: 50 },
      country: { type: String, required: [true, 'Event must have a country'], maxlength: 100 },
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'Event must have an email'],
      validate: [isEmail, 'Invalid email'],
    },
    phone: { type: String, required: [true, 'Event must have a phone'] },
  },
};

const eventSchema = new mongoose.Schema(schema);

export const Event = mongoose.model('event', eventSchema);
