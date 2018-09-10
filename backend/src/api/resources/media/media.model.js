import mongoose from 'mongoose';

const required = '~ is required';

export const schema = {
  sl: { description: { type: String, default: '' } },
  en: { description: { type: String, default: '' } },
  title: {
    type: String,
    maxlength: 200,
    required: [true, required],
    index: true,
  },
  url: { type: String, maxlength: 300, required: [true, required] },
  mediaType: {
    type: String,
    enum: ['video', 'audio'],
    required: [true, required],
    index: true,
  },
  tag: [String],
  adminname: { type: String, required: [true, required], maxlength: 20 },
  date: {
    type: Date,
    default: Date.now,
    required: [true, required],
    index: true,
  },
};

const mediaSchema = new mongoose.Schema(schema);

export const Media = mongoose.model('media', mediaSchema);
