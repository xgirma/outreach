import mongoose from 'mongoose';
import dotenv from 'dotenv';

mongoose.Promise = global.Promise;
dotenv.config();
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
// mongoose.set('useNewUrlParser', true);

export const removeModel = (modelName) => {
  const model = mongoose.model(modelName);
  /* eslint-disable-next-line */
  return new Promise((resolve, reject) => {
    if (!model) {
      return resolve();
    }
    model.remove((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

export const dropDatabase = () =>
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => Promise.all(mongoose.modelNames().map(removeModel)));
