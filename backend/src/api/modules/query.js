import merge from 'lodash.merge';
import { NOTFUD } from '../docs/error.codes';

export const controllers = {
  createOne(model, body) {
    return model.create(body);
  },

  updateOne(docToUpdate, update) {
    merge(docToUpdate, update);
    return docToUpdate.save();
  },

  deleteOne(docToDelete) {
    return docToDelete.remove();
  },

  getOne(docToGet) {
    return Promise.resolve(docToGet);
  },

  getAll(model) {
    return model.find({});
  },

  findByParam(model, id) {
    if (Number.isInteger(Number(id))) {
      return model.findById(id);
    }
    return Promise.resolve(null);
  },
};

export const createOne = (model) => (req, res, next) => {
  controllers
    .createOne(model, req.body)
    .then((doc) => res.status(201).json(doc))
    .catch((error) => setImmediate(() => next(error)));
};

export const updateOne = (model) => async (req, res, next) => {
  const docToUpdate = req.docFromId;
  const update = req.body;

  return controllers
    .updateOne(docToUpdate, update)
    .then((doc) => res.status(201).json(doc))
    .catch((error) => setImmediate(() => next(error)));
};

export const deleteOne = (model) => (req, res, next) =>
  controllers
    .deleteOne(req.docFromId)
    .then((doc) => res.status(201).json(doc))
    .catch((error) => setImmediate(() => next(error)));

export const getOne = (model) => (req, res, next) =>
  controllers
    .getOne(req.docFromId)
    .then((doc) => res.status(200).json(doc))
    .catch((error) => setImmediate(() => next(error)));

export const getAll = (model) => (req, res, next) =>
  controllers
    .getAll(model)
    .then((docs) => res.json(docs))
    .catch((error) => setImmediate(() => next(error)));

export const findByParam = (model) => (req, res, next, id) =>
  controllers
    .findByParam(model, id)
    .then((doc) => {
      if (!doc) {
        next(NOTFUD);
      } else {
        req.docFromId = doc;
        next();
      }
    })
    .catch((error) => setImmediate(() => next(error)));

export const generateControllers = (model, overrides = {}) => {
  const defaults = {
    findByParam: findByParam(model),
    getAll: getAll(model),
    getOne: getOne(model),
    deleteOne: deleteOne(model),
    updateOne: updateOne(model),
    createOne: createOne(model),
  };

  return { ...defaults, ...overrides };
};
