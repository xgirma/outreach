import mongoose from 'mongoose';

const required = '~ is required';

export const schema = {
  sl: {
    title: { type: String, maxlength: 200 },
    author: { type: String, maxlength: 100 },
    intro: {
      type: String,
      required: [true, required],
    },
  },
  en: {
    title: { type: String, maxlength: 200 },
    author: { type: String, maxlength: 100 },
    intro: {
      type: String,
      required: [true, required],
    },
  },
  adminname: {
    type: String,
    required: [true, required],
    maxlength: 20,
  },
  date: { type: Date, default: Date.now, required: [true, required], index: true },
};

const introSchema = new mongoose.Schema(schema);

export const Intro = mongoose.model('intro', introSchema);
