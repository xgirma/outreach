import mongoose from 'mongoose';

const schema = {
  sl: { description: { type: String, default: '' } },
  en: { description: { type: String, default: '' } },
  title: {
    type: String,
    maxlength: 200,
    required: true,
    index: true,
  },
  url: { type: String, maxlength: 300, required: true },
  mediaType: {
    type: String,
    enum: ['video', 'audio'],
    required: true,
    index: true,
  },
  tag: [String],
  adminname: { type: String, required: true, maxlength: 50 },
  date: {
    type: Date,
    default: Date.now,
    required: true,
    index: true,
  },
};

const mediaSchema = new mongoose.Schema(schema);
const Media = mongoose.model('media', mediaSchema);

export default Media;
