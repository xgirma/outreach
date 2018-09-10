import mongoose from 'mongoose';

const required = '~ is required';

export const schema = {
  sl: {
    title: { type: String, maxlength: 200, required: [true, required] },
    description: { type: String, required: [true, required]  },
  },
  en: {
    title: { type: String, maxlength: 200, required: [true, required] },
    description: { type: String, required: [true, required]  },
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
  tag: { type: String, maxlength: 100, index: true },
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

export const Blog = mongoose.model('blog', blogSchema);
