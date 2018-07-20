import mongoose from 'mongoose';

export const schema = {
  am: {
    title: { type: String, maxlength: 200, required: [true, 'event must have a title'] },
    body: { type: String },
  },
  en: {
    title: { type: String, maxlength: 200, required: [true, 'event must have a title'] },
    body: { type: String },
  },
  author: { type: String, maxlength: 100, index: true, required: true },
  dateStart: { type: Date, default: Date.now, index: true, required: [true, 'first publish date'] },
  tag: { type: String, maxlength: 100, index: true },
  adminname: { type: String, required: [true, 'info must have a adminname who publish the post'], maxlength: 20 },
  date: { type: Date, default: Date.now, index: true, required: [true, 'last updated date'] },
};

const blogSchema = new mongoose.Schema(schema);

export const Blog = mongoose.model('blog', blogSchema);
