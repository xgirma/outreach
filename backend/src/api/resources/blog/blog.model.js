import mongoose from 'mongoose';
import * as err from '../../modules/error';

const schema = {
  sl: {
    title: { type: String, maxlength: 200, required: true },
    description: { type: String, required: true },
  },
  en: {
    title: { type: String, maxlength: 200, required: true },
    description: { type: String, required: true },
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
    required: true,
  },
  tag: [String],
  adminname: {
    type: String,
    required: true,
    maxlength: 50,
  },
  date: {
    type: Date,
    default: Date.now,
    index: true,
    required: true,
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

const Blog = mongoose.model('blog', blogSchema);

export default Blog; // TODO prevent past dateStart
