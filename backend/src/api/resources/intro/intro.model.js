import mongoose from 'mongoose';

export const schema = {
  am: {
    title: { type: String, maxlength: 200 },
    author: { type: String, maxlength: 100 },
    intro: {
      type: String,
      required: [true, 'introduction is missing'],
    },
  },
  en: {
    title: { type: String, maxlength: 200 },
    author: { type: String, maxlength: 100 },
    intro: {
      type: String,
      required: [true, 'introduction is missing'],
    },
  },
  adminname: { type: String, required: [true, 'introduction must have a adminname'], maxlength: 20 },
  date: { type: Date, default: Date.now, index: true },
};

const introSchema = new mongoose.Schema(schema);

export const Intro = mongoose.model('intro', introSchema);
