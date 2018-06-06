import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import logger from '../../modules/logger';

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

const userSchema = new mongoose.Schema(schema, { timestamps: true });

userSchema.methods = {
  authenticate(plaintTextPassword) {
    return bcrypt.compareSync(plaintTextPassword, this.passwordHash);
  },
  hashPassword(plaintTextPassword) {
    if (!plaintTextPassword) {
      logger.error('Can not create a new user', {user: this.username});
      throw new Error('Could not save user');
    }

    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plaintTextPassword, salt);
  },
};

export const User = mongoose.model('user', userSchema);
