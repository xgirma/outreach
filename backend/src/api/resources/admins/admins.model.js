import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
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
  role: {
    type: Number,
    enum: [0, 1],
    required: true,
  },
};

const adminsSchema = new mongoose.Schema(schema, { timestamps: true });
adminsSchema.plugin(uniqueValidator);

adminsSchema.methods = {
  authenticate(plainTextPassword) {
    return bcrypt.compareSync(plainTextPassword, this.passwordHash);
  },
  hashPassword(plainTextPassword) {
    if (!plainTextPassword) {
      logger.error('can not create a new Admin user', { admin: this.username });
      throw new Error('could not save admin user');
    }

    const salt = bcrypt.genSaltSync(12);
    return bcrypt.hashSync(plainTextPassword, salt);
  },
};

export const Admins = mongoose.model('admins', adminsSchema);
