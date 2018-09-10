import mongoose from 'mongoose';
import { isEmail } from 'validator';
import moment from 'moment';
import * as err from './../../modules/error';

const now = moment().format('YYYY-MM-DD');
const required = '~ is required';

export const schema = {
  sl: {
    title: { type: String, maxlength: 200, required: [true, required] },
    description: { type: String },
  },
  en: {
    title: { type: String, maxlength: 200, required: [true, required] },
    description: { type: String },
  },
  address: {
    street: { type: String, required: [true, required], maxlength: 200 },
    city: { type: String, required: [true, required], maxlength: 50 },
    state: { type: String, maxlength: 50 },
    zip: { type: String, maxlength: 50 },
    country: { type: String, required: [true, required], maxlength: 100 },
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: [isEmail, 'invalid email, enter a valid email'],
  },
  phone: { type: String, required: [true, required] },
  dateStart: { type: Date, required: [true, required], index: true },
  dateEnd: { type: Date, required: [true, required], index: true },
  adminname: { type: String, required: [true, required], maxlength: 20 },
  date: { type: Date, default: Date.now, required: [true, required], index: true }, // document creation date
};

const eventSchema = new mongoose.Schema(schema);

eventSchema.pre('validate', function validateEventDate(next) {
  if (moment(this.dateStart).isBefore(now)) {
    next(err.BadRequest('start date must be greater than or equal to now'));
  }

  if (moment(this.dateStart).isSame(this.dateEnd)) {
    next();
  }

  if (moment(this.dateEnd).isBefore(this.dateStart)) {
    next(err.BadRequest('end date must be greater than start date'));
  }

  next();
});

export const Event = mongoose.model('event', eventSchema);
