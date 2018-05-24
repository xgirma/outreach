require('dotenv').config();

export const config = {
  expireTime: process.env.EXPIRE_TIME,
  secrets: {
    JWT_SECRET: process.env.JWT_SECRET,
  },
  db: {
    url: process.env.MONGODB_URL,
  },
};
