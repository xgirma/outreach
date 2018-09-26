import mongoose from 'mongoose';
import * as err from './../../modules/error';

export const schema = {
  sl: {
    title: { type: String, maxlength: 200, default: '' },
    author: { type: String, maxlength: 100, default: '' },
    intro: {
      type: String,
      required: true,
    },
  },
  en: {
    title: { type: String, maxlength: 200, default: '' },
    author: { type: String, maxlength: 100, default: '' },
    intro: {
      type: String,
      required: true,
    },
  },
  adminname: {
    type: String,
    required: true,
    maxlength: 50,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
    index: true,
  },
};

const introSchema = new mongoose.Schema(schema);

introSchema.pre('validate', function introValidate(next) {
  if (this.sl.intro === '<p><br></p>') {
    next(err.BadRequest('sl.introduction is required'));
  }

  if (this.en.intro === '<p><br></p>') {
    next(err.BadRequest('en.introduction is required'));
  }

  next();
});

export const Intro = mongoose.model('intro', introSchema);
