import mongoose from 'mongoose';
import { isEmail } from 'validator';
import moment from 'moment';
import * as err from './../../modules/error';

const now = moment().format('YYYY-MM-DD');

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
  dateStart: { type: Date, index: true },
  dateEnd: { type: Date, index: true },
  adminname: { type: String, required: [true, 'event must have a adminname'], maxlength: 20 },
  date: { type: Date, default: Date.now, index: true }, // document creation date
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
