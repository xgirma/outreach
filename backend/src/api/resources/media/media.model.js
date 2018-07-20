import mongoose from 'mongoose';

export const schema = {
  am: {
    body: { type: String },
  },
  en: {
    body: { type: String },
  },
  title: {
    type: String,
    maxlength: 200,
    required: [true, 'Media must have a title'],
    index: true,
  },
  url: { type: String, maxlength: 300, required: [true, 'Media must have url'] },
  mediaType: {
    type: String,
    enum: ['video', 'audio'],
    required: [true, 'Media type must be selected'],
    index: true,
  },
  tag: { type: String, maxlength: 100, index: true },
};

const mediaSchema = new mongoose.Schema(schema);

export const Media = mongoose.model('media', mediaSchema);
