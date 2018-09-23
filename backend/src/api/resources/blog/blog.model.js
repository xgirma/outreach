import mongoose from 'mongoose';
import * as err from '../../modules/error';

const required = '~ is required';

export const schema = {
  sl: {
    title: { type: String, maxlength: 200, required: [true, required] },
    description: { type: String, required: [true, required] },
  },
  en: {
    title: { type: String, maxlength: 200, required: [true, required] },
    description: { type: String, required: [true, required] },
  },
  author: {
    type: String,
    maxlength: 100,
    index: true,
    required: true,
  },
  dateStart: {
    type: Date,
    default: Date.now,
    index: true,
    required: [true, required],
  },
  tag: [String],
  adminname: {
    type: String,
    required: [true, required],
    maxlength: 20,
  },
  date: {
    type: Date,
    default: Date.now,
    index: true,
    required: [true, required],
  },
};

const blogSchema = new mongoose.Schema(schema);

blogSchema.pre('validate', function introValidate(next) {
  if (this.sl.description === '<p><br></p>') {
    next(err.BadRequest('sl.description ~ is required'));
  }

  if (this.en.description === '<p><br></p>') {
    next(err.BadRequest('en.description ~ is required'));
  }

  next();
});

export const Blog = mongoose.model('blog', blogSchema);
