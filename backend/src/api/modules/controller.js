/* eslint-disable arrow-parens, no-unused-vars */
import merge from 'lodash.merge';
import { isMongoId } from 'validator';
import { NOTFUD, MDUERR } from '../docs/error.codes';
import { Admin } from '../resources/admin/admin.model';
import { signToken } from './auth';
import logger from './logger';

export const controllers = {
  createOne(model, body) {
    return model.create(body);
  },

  addNewAdmin(model, body) {
    const newUser = new Admin(body);

    return model
      .find({ role: 0 })
      .exec()
      .then((doc) => {
        newUser.passwordHash = newUser.hashPassword(body.password);
        if (Array.isArray(doc) && doc.length === 0) {
          newUser.role = 0;
          logger.info('supper admin is created', { name: newUser.username });
          return model.create(newUser);
        }
        newUser.role = 1;
        logger.info('admin is created', { name: newUser.username });
        return model.create(newUser);
      })
      .catch((error) => {
        logger.error('can not register admin', { error });
        throw new Error(error);
      });
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

  getPast(model) {
    return model.find({ date_end: { $lt: new Date() } });
  },

  getFuture(model) {
    return model.find({ date_end: { $gte: new Date() } });
  },

  findByParam(model, id) {
    return model.findById(id);
  },
};

export const createOne = (model) => (req, res, next) =>
  controllers
    .createOne(model, req.body)
    .then((doc) => res.status(201).json(doc))
    .catch((error) => {
      if (error.code === 11000) {
        setImmediate(() => next(MDUERR));
      } else {
        setImmediate(() => next(error));
      }
    });

export const registerAdmin = (model) => (req, res, next) => {
  controllers
    .addNewAdmin(model, req.body)
    .then((newUser) => {
      const token = signToken(newUser.id);
      res.status(201).json({ status: 'success', data: { token } });
    })
    .catch((error) => {
      setImmediate(() => next(error));
    });
};

export const updateOne = () => (req, res, next) => {
  const docToUpdate = req.docFromId;
  const update = req.body;

  return controllers
    .updateOne(docToUpdate, update)
    .then((doc) => res.status(201).json(doc))
    .catch((error) => setImmediate(() => next(error)));
};

export const deleteOne = () => (req, res, next) =>
  controllers
    .deleteOne(req.docFromId)
    .then((doc) => res.status(201).json(doc))
    .catch((error) => setImmediate(() => next(error)));

export const getOne = () => (req, res, next) =>
  controllers
    .getOne(req.docFromId)
    .then((doc) => res.status(200).json(doc))
    .catch((error) => setImmediate(() => next(error)));

export const getAll = (model) => (req, res, next) =>
  controllers
    .getAll(model)
    .then((docs) => res.status(200).json(docs))
    .catch((error) => setImmediate(() => next(error)));

export const getPast = (model) => (req, res, next) => {
  controllers
    .getPast(model)
    .then((docs) => res.status(200).json(docs))
    .catch((error) => setImmediate(() => next(error)));
};

export const getFuture = (model) => (req, res, next) => {
  controllers
    .getFuture(model)
    .then((docs) => res.status(200).json(docs))
    .catch((error) => setImmediate(() => next(error)));
};

export const findByIdParam = (model) => (req, res, next, id) => {
  if (isMongoId(id)) {
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
  } else {
    setImmediate(() => next());
  }
};

export const getAllAdmin = (model) => (req, res, next) => {
  const { user } = req;
  if (user.role === 0) {
    controllers
      .getAll(model)
      .then((docs) => res.status(200).json(docs))
      .catch((error) => setImmediate(() => next(error)));
  } else {
    res.status(200).json(user);
  }
};

export const getAdmin = (model) => (req, res, next) => {
  const { user } = req;
  if (user.role === 0) {
    controllers
      .getOne(req.docFromId)
      .then((doc) => res.status(200).json(doc))
      .catch((error) => setImmediate(() => next(error)));
  } else {
    res.status(200).json(user);
  }
};

export const updateAdmin = (model) => (req, res, next) => {
  const { user } = req;
  if (user.role === 0) {
    const docToUpdate = req.docFromId;
    const update = req.body;

    return controllers
      .updateOne(docToUpdate, update)
      .then((doc) => res.status(201).json(doc))
      .catch((error) => setImmediate(() => next(error)));
  }
  const update = req.body;
  return controllers
    .updateOne(user, update)
    .then((doc) => res.status(201).json(doc))
    .catch((error) => setImmediate(() => next(error)));
};

export const deleteAdmin = (model) => (req, res, next) => {
  const { user } = req;
  if (user.role === 0) {
    controllers
      .deleteOne(req.docFromId)
      .then((doc) => res.status(201).json(doc))
      .catch((error) => setImmediate(() => next(error)));
  } else {
    controllers
      .deleteOne(user)
      .then((doc) => res.status(201).json(doc))
      .catch((error) => setImmediate(() => next(error)));
  }
};

export const generateControllers = (model, overrides = {}) => {
  const defaults = {
    findByIdParam: findByIdParam(model),
    getAll: getAll(model),
    getOne: getOne(model),
    getPast: getPast(model),
    getFuture: getFuture(model),
    deleteOne: deleteOne(model),
    updateOne: updateOne(model),
    createOne: createOne(model),
    getAllAdmin: getAllAdmin(model),
    getAdmin: getAdmin(model),
    updateAdmin: updateAdmin(model),
    deleteAdmin: deleteAdmin(model),
    registerAdmin: registerAdmin(model),
  };

  return { ...defaults, ...overrides };
};
