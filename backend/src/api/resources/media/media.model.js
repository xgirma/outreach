import mongoose from 'mongoose';

export const schema = {
  am: {
    body: { type: String },
  },
  en: {
    body: { type: String },
  },
  title: { type: String, maxlength: 200, required: [true, 'Media must have a title'] },
  url: { type: String, maxlength: 300, required: [true, 'Media must have url'] },
  media_type: {
    type: String,
    enum: ['video', 'audio'],
    required: [true, 'Media type must be selected'],
  },
  tag: { type: String, maxlength: 100 },
};

const mediaSchema = new mongoose.Schema(schema);

export const Media = mongoose.model('media', mediaSchema);
