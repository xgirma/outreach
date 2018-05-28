import mongoose from 'mongoose';

export const schema = {
  _id: {
    type: Number,
    default: 202020,
  },
  am: {
    title: { type: String, maxlength: 200, required: [true, 'Event must have a title'] },
    body: { type: String },
  },
  en: {
    title: { type: String, maxlength: 200, required: [true, 'Event must have a title'] },
    body: { type: String },
  },
  author: { type: String, maxlength: 100 },
  date_start: { type: Date, default: Date.now, index: true },
  tag: { type: String, maxlength: 100 },
};

const blogSchema = new mongoose.Schema(schema);

export const Blog = mongoose.model('blog', blogSchema);
