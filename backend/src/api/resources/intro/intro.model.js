import mongoose from 'mongoose';

export const schema = {
  _id: {
    type: Number,
    default: 100,
  },
  am: {
    title: { type: String, maxlength: 200 },
    author: { type: String, maxlength: 100 },
    intro: {
      type: String,
      required: [true, 'Introduction/main matter is missing.'],
    },
  },
  en: {
    title: { type: String, maxlength: 200 },
    author: { type: String, maxlength: 100 },
    intro: {
      type: String,
      required: [true, 'Introduction/main matter is missing'],
    },
  },
  date_start: { type: Date, default: Date.now, index: true },
};

const introSchema = new mongoose.Schema(schema);

export const Intro = mongoose.model('intro', introSchema);
