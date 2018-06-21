import mongoose from 'mongoose';
import '../src/api/resources/blog/blog.model';
import '../src/api/resources/event/event.model';
import '../src/api/resources/info/info.model';
import '../src/api/resources/intro/intro.model';
import '../src/api/resources/media/media.model';
import '../src/api/resources/service/service.model';
import '../src/api/resources/admins/admins.model';

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
    .connect(process.env.MONGODB_URL)
    .then(() => Promise.all(mongoose.modelNames().map(removeModel)));
