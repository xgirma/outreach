import mongoose from 'mongoose';
import * as err from './../../modules/error';

const required = '~ is required';

export const schema = {
  sl: {
    title: { type: String, maxlength: 200, default: '' },
    author: { type: String, maxlength: 100, default: '' },
    intro: {
      type: String,
      required: [true, required],
    },
  },
  en: {
    title: { type: String, maxlength: 200, default: '' },
    author: { type: String, maxlength: 100, default: '' },
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
  date: {
    type: Date,
    default: Date.now,
    required: [true, required],
    index: true,
  },
};

const introSchema = new mongoose.Schema(schema);

introSchema.pre('validate', function (next) {
  if(this.sl.intro === "<p><br></p>") {
    next(err.BadRequest('sl.introduction ~ is required'))
  }

  if(this.en.intro === "<p><br></p>") {
    next(err.BadRequest('en.introduction ~ is required'))
  }
  
  next();
});

export const Intro = mongoose.model('intro', introSchema);
