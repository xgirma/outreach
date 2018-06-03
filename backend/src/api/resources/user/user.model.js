import mongoose from 'mongoose';

export const schema = {
  username: {
    type: String,
    unique: true,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
};

const userSchema = new mongoose.Schema(schema);

export const User = mongoose.model('user', userSchema);
