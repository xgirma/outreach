import mongoose from 'mongoose';
import '../model/info';

mongoose.Promise = global.Promise;

export const removeModel = (modelName) => {
  const model = mongoose.model(modelName);
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

export const dropDb = () =>
  mongoose
    .connect('process.env.MONGODB_URL', {
      useMongoClient: true,
    })
    .then(() => Promise.all(mongoose.modelNames().map(removeModel)));
