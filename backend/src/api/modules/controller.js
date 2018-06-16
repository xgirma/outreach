/* eslint-disable arrow-parens, no-unused-vars, no-underscore-dangle, function-paren-newline */
import merge from 'lodash.merge';
import { isMongoId } from 'validator';
import { NOTFUD, MDUERR, AUTERR } from '../docs/error.codes';
import { Admin } from '../resources/admin/admin.model';
import { signToken, decodeToken } from './auth';
import logger from './logger';

export const controllers = {
  addSuperAdmin(model, body) {
    const superAdmin = new Admin(body);

    return model
      .find({ role: 0 })
      .exec()
      .then((doc) => {
        superAdmin.passwordHash = superAdmin.hashPassword(body.password);
        if (Array.isArray(doc) && doc.length === 0) {
          superAdmin.role = 0;
          return model.create(superAdmin);
        }
        logger.warn('super-admin already exist');
        return null;
      })
      .catch((error) => {
        logger.error('can not register super-admin', { error });
        throw new Error(error);
      });
  },

  addAdmin(model, body, user) {
    return model
      .find({ role: 0 })
      .exec()
      .then((doc) => {
        if (Array.isArray(doc) && doc.length === 0) {
          return null;
        }
        const adminUser = JSON.parse(JSON.stringify(doc));
        if (adminUser[0]._id === user.id && adminUser[0].role === user.role) {
          const newAdmin = new Admin(body);
          newAdmin.passwordHash = newAdmin.hashPassword(body.password);
          newAdmin.role = 1;
          return model.create(newAdmin);
        }
        return null;
      })
      .catch((error) => {
        logger.error('can not register admin', { error });
        throw new Error(error);
      });
  },

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

/**
 * Register super-admin
 * @param model - admin
 * @returns {Function}
 */
export const registerSuperAdmin = (model) => (req, res, next) => {
  controllers
    .addSuperAdmin(model, req.body)
    .then((superAdmin) => {
      if (superAdmin) {
        const token = signToken(superAdmin.id);
        logger.info('supper-admin is registered', { name: superAdmin.username });
        res.status(201).json({
          status: 'success',
          data: { token },
        });
      } else {
        res.status(403).json({
          status: 'fail',
          data: { ...AUTERR },
        });
      }
    })
    .catch((error) => {
      setImmediate(() => next(error));
    });
};

/**
 * Super-admin register admin
 * @param model - admin
 * @returns {Function}
 */
export const registerAdmin = (model) => (req, res, next) => {
  decodeToken();
  controllers
    .addAdmin(model, req.body, req.user)
    .then((newAdmin) => {
      if (newAdmin) {
        const token = signToken(newAdmin.id);
        logger.info('admin is registered', { name: newAdmin.username });
        res.status(201).json({
          status: 'success',
          data: { token },
        });
      } else {
        res.status(403).json({
          status: 'fail',
          data: { ...AUTERR },
        });
      }
    })
    .catch((error) => {
      setImmediate(() => next(error));
    });
};

/**
 * Get all admins if super-admin, else gets aa admin
 * @param model - admin
 * @returns {Function}
 */
export const getAdmins = (model) => (req, res, next) => {
  logger.silly('i was here');
  const { user } = req;
  if (user.role === 0) {
    controllers
      .getAll(model)
      .then((admin) =>
        res.status(200).json({
          status: 'success',
          data: { admin },
        }),
      )
      .catch((error) => {
        setImmediate(() => {
          next({
            status: 'fail',
            data: { ...error },
          });
        });
      });
  } else {
    res.status(200).json({
      status: 'success',
      data: { admin: user },
    });
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
    registerSuperAdmin: registerSuperAdmin(model),
    registerAdmin: registerAdmin(model),
    getAdmins: getAdmins(model),
    getAdmin: getAdmin(model),
    findByIdParam: findByIdParam(model),
    getAll: getAll(model),
    getOne: getOne(model),
    getPast: getPast(model),
    getFuture: getFuture(model),
    deleteOne: deleteOne(model),
    updateOne: updateOne(model),
    createOne: createOne(model),
    updateAdmin: updateAdmin(model),
    deleteAdmin: deleteAdmin(model),
  };

  return { ...defaults, ...overrides };
};
