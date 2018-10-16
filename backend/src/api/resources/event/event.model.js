import mongoose from 'mongoose';
import { isEmail } from 'validator';
import moment from 'moment';
import * as err from '../../modules/error';

const now = moment().format('YYYY-MM-DD');

export const schema = {
  sl: {
    title: { type: String, maxlength: 200, required: true },
    description: { type: String },
  },
  en: {
    title: { type: String, maxlength: 200, required: true },
    description: { type: String },
  },
  address: {
    street: { type: String, required: true, maxlength: 200 },
    city: { type: String, required: true, maxlength: 50 },
    state: { type: String, maxlength: 50, default: '' },
    zip: { type: String, maxlength: 50, default: '' },
    country: { type: String, required: true, maxlength: 100 },
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: [isEmail, 'invalid email'],
  },
  phone: { type: String, required: true },
  dateStart: { type: Date, required: true, index: true },
  dateEnd: { type: Date, required: true, index: true },
  adminname: { type: String, required: true, maxlength: 50 },
  date: {
    type: Date,
    default: Date.now,
    required: true,
    index: true,
  },
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
