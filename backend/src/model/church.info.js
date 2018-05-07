import mongoose, { Schema } from 'mongoose';

const infoSchema = new Schema({
  _id: { type: Number, default: 1, maxlength: 2 },
  am: {
    name: { type: String, required: true, maxlength: 200 },
    denomination: { type: String, required: true, maxlength: 100 },
    phone: { type: String, required: true },
    address: {
      street: { type: String, required: true, maxlength: 200 },
      city: { type: String, required: true, maxlength: 50 },
      state: { type: String, required: true, maxlength: 50 },
      zip: { type: Number, required: true, max: 1000000 },
      country: { type: String, required: true, maxlength: 50 },
    },
    bible: {
      verse: { type: String, required: true, maxlength: 500 },
      from: { type: String, required: true, maxlength: 50 },
    },
  },
  en: {
    name: { type: String, required: true, maxlength: 200 },
    denomination: { type: String, required: true, maxlength: 100 },
    phone: { type: String, required: true },
    address: {
      street: { type: String, required: true, maxlength: 200 },
      city: { type: String, required: true, maxlength: 50 },
      state: { type: String, required: true, maxlength: 50 },
      zip: { type: Number, required: true, max: 1000000 },
      country: { type: String, required: true, maxlength: 50 },
    },
    bible: {
      verse: { type: String, required: true, maxlength: 500 },
      from: { type: String, required: true, maxlength: 50 },
    },
  },
});

module.exports = mongoose.model('Info', infoSchema);
