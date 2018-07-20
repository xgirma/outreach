import mongoose from 'mongoose';
import { isEmail } from 'validator';

export const schema = {
  am: {
    title: { type: String, maxlength: 200, required: [true, 'event must have a title'] },
    description: { type: String },
  },
  en: {
    title: { type: String, maxlength: 200, required: [true, 'event must have a title'] },
    description: { type: String },
  },
  address: {
    street: { type: String, required: [true, 'event must have a street'], maxlength: 200 },
    city: { type: String, required: [true, 'event must have a city'], maxlength: 50 },
    state: { type: String, maxlength: 50 },
    zip: { type: String, maxlength: 50 },
    country: { type: String, required: [true, 'event must have a country'], maxlength: 100 },
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: [isEmail, 'invalid email'],
  },
  phone: { type: String, required: [true, 'event must have a phone'] },
  dateStart: { type: Date, default: Date.now, index: true },
  dateEnd: { type: Date, default: Date.now, index: true },
  adminname: { type: String, required: [true, 'event must have a adminname'], maxlength: 20 },
  date: { type: Date, default: Date.now, index: true }, // document creation date
};

const eventSchema = new mongoose.Schema(schema);

export const Event = mongoose.model('event', eventSchema);
