import mongoose from 'mongoose';

export const schema = {
  am: { description: { type: String } },
  en: { description: { type: String } },
  title: {
    type: String,
    maxlength: 200,
    required: [true, 'media must have a title'],
    index: true,
  },
  url: { type: String, maxlength: 300, required: [true, 'media must have url'] },
  mediaType: {
    type: String,
    enum: ['video', 'audio'],
    required: [true, 'media type must be selected'],
    index: true,
  },
  tag: [String],
  adminname: { type: String, required: [true, 'media must have a adminname'], maxlength: 20 },
  date: { type: Date, default: Date.now, index: true },
};

const mediaSchema = new mongoose.Schema(schema);

export const Media = mongoose.model('media', mediaSchema);
