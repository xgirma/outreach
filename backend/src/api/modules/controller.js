/* eslint-disable arrow-parens, no-unused-vars, no-underscore-dangle, function-paren-newline */
import merge from 'lodash.merge';
import isEmpty from 'lodash.isempty';
import { generate } from 'generate-password/src/generate';
import { isMongoId } from 'validator';
import { passwordStrengthTest, passwordConfig } from './password';
import * as test from './schema';
import * as err from './error';
import { Admins } from '../resources/admins/admins.model';
import { signToken, decodeToken } from './auth';
import logger from './logger';

export const controllers = {
  /*
   * Writes a supper admin to database if it dose not exist
   *
   * @param model: admin user model
   * @param body: object containing username and password
   *    {
   *      username: "John.Doe",
   *      password: "p-U:QaA/3G"
   *    }
   *
   * @return: a new admin (role = 0) or error
   *
   * This function may fail for several reasons
   * - invalid request body
   * - weak password: OWASP Password Strength Test
   */
  addSuperAdmin(model, body) {
    return model
      .find({ role: 0 })
      .exec()
      .then((doc) => {
        const superAdmin = new Admins(body);
        superAdmin.passwordHash = superAdmin.hashPassword(body.password);
        if (isEmpty(doc)) {
          superAdmin.role = 0;
          return model.create(superAdmin);
        }
        return null;
      })
      .catch((error) => {
        throw error;
      });
  },

  /*
   * Super-admin writes an admin to database
   *
   * @param model: admin user model
   * @param body - object containing username and password
   *    {
   *      username: "John.Doe",
   *      password: "p-U:QaA/3G"
   *    }
   * @param user - super-admin user object
   *    {
   *      _id: "5b306f3331c68b024299ee26",
   *      username: "John.Doe",
   *      passwordHash: "$2b$10$5pbNcCAsqoR247LPcFnhB.tv8uD66ZJTmdYoOW4WbZaJ3PhZlgM/m",
   *      role: 0,
   *      createdAt: 2018-06-25T04:19:45.080Z,
   *      updatedAt: 2018-06-25T04:19:45.080Z,
   *      __v: 0
   *    },
   *
   *  @return: new admin (role = 1) / error
   *
   *  This function may fail for several reasons
   *  - invalid request body
   *  - password: OWASP Password Strength Test
   */
  addAdmin(model, body, superAdmin) {
    return model
      .find({ role: 0 })
      .exec()
      .then((doc) => {
        if (isEmpty(doc)) {
          logger.warning('super-admin user is not found in database');
          return null;
        }

        const adminUser = JSON.parse(JSON.stringify(doc));
        // check if superAdmin is super-admin
        if (superAdmin._id.equals(adminUser[0]._id)) {
          const newAdmin = new Admins(body);
          newAdmin.passwordHash = newAdmin.hashPassword(body.password);
          newAdmin.role = 1;
          return model.create(newAdmin);
        }

        logger.warning('a non super-admin user attempted to create admin');
        return null;
      })
      .catch((error) => {
        if (error.name === 'ValidationError') {
          logger.warn('duplicate user', { error });
          throw err.Forbidden('user already exists');
        }
        throw error;
      });
  },

  createOne(model, body, adminname) {
    return model.create({ ...body, adminname });
  },

  updateOne(docToUpdate, update, adminname) {
    const newUpdate = { ...update, adminname };
    merge(docToUpdate, newUpdate);
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
    return model.find({ dateEnd: { $lt: new Date() } });
  },

  getFuture(model) {
    return model.find({ dateEnd: { $gte: new Date() } });
  },

  findByParam(model, id) {
    return model.findById(id);
  },
};

/*
 * Creates supper admin if it dose not exist and sign a token
 *
 * @param model: admin user model
 *
 * @return: a token / error
 *
 * This function may fail for several reasons
 * - if super admin already exist
 */
export const registerSuperAdmin = (model) => (req, res, next) => {
  const { body } = req;
  test.usernamePasswordObject(body);
  passwordStrengthTest(body.password);

  controllers
    .addSuperAdmin(model, body)
    .then((superAdmin) => {
      if (superAdmin) {
        const { id, username } = superAdmin;
        const token = signToken(id);
        logger.info('supper-admin is registered', { username });
        res.status(201).json({
          status: 'success',
          data: { token },
        });
      } else {
        const { username } = body;
        logger.warn('failed supper-admin registration', { username });
        throw err.Forbidden('user already exists');
      }
    })
    .catch((error) => {
      setImmediate(() => next(error));
    });
};

/*
 * Creates admin
 *
 * @param model: admin user model
 *
 * @return: success with no data / error
 *
 * This function may fail for several reasons
 * - if admin with the same name already exists
 */
export const registerAdmin = (model) => (req, res, next) => {
  const { body, user } = req;
  test.usernameObject(body);
  const temporaryPassword = generate({ ...passwordConfig });
  body.password = temporaryPassword;
  decodeToken();

  controllers
    .addAdmin(model, body, user)
    .then((newAdmin) => {
      if (newAdmin) {
        logger.info('admin is registered', { name: newAdmin.username });
        res.status(201).json({ status: 'success', data: { temporaryPassword } });
      } else {
        const { username } = body;
        logger.warn('failed admin registration', { username });
        throw err.Forbidden();
      }
    })
    .catch((error) => {
      setImmediate(() => next(error));
    });
};

/*
 * Requesting user super-admin :-> gets all admin user data
 * Requesting user admin :-> gets its own user data only
 *
 * @param model - admin
 * @returns {Function}
 */
export const getAdmins = (model) => (req, res, next) => {
  decodeToken();

  const { user } = req;

  if (user.role === 0) {
    controllers
      .getAll(model)
      .then((admins) =>
        res.status(200).json({
          status: 'success',
          data: { admins },
        }),
      )
      .catch((error) => {
        setImmediate(() => next(error));
      });
  } else {
    res.status(200).json({
      status: 'success',
      data: { admins: [user] },
    });
  }
};

/*
 * Requesting user super-admin :-> gets any admin user data by id, including self
 * Requesting user admin :-> gets its own user data only
 *
 * @param model - admin
 * @returns {Function}
 */
export const getAdmin = (model) => (req, res, next) => {
  const { user } = req;
  if (user.role === 0) {
    controllers
      .getOne(req.docFromId)
      .then((admin) => {
        if (!admin) throw err.NotFound();
        res.status(200).json({
          status: 'success',
          data: { admins: admin },
        });
      })
      .catch((error) => {
        setImmediate(() => next(error));
      });
  } else {
    res.status(200).json({
      status: 'success',
      data: { admins: user },
    });
  }
};

/*
 * Requesting user super-admin :-> delete any admin user by id
 * Requesting user admin :-> delete itself only
 *
 * @param model - admin
 * @returns {Function}
 *
 * This function may fail for several reasons
 * - if admin tries to delete another admin
 */
export const deleteAdmin = (model) => (req, res, next) => {
  const { user } = req;
  if (user.role === 0) {
    controllers
      .deleteOne(req.docFromId)
      .then((admin) => {
        logger.info('admin deleted', { name: admin.username });
        res.status(202).json({
          status: 'success',
          data: {},
        });
      })
      .catch((error) => setImmediate(() => next(error))); //
  } else if (user._id.equals(req.docFromId.id)) {
    controllers.deleteOne(user).then((self) => {
      logger.info('admin deleted', { name: self.username });
      res.status(202).json({
        status: 'success',
        data: {},
      });
    });
  } else {
    logger.warn('unauthorized attempted to delete admin', { data: req.docFromId.username });
    setImmediate(() => next(err.Unauthorized()));
  }
};

/*
 * By super-admin
 * 1.1. update super-admin (self) password: {newPassword, newPasswordAgain, currentPassword }
 * 1.2. update other admin password { id, return temporary password }
 *
 * By admin
 * 2.1. update admin (self) password: {newPassword, newPasswordAgain, currentPassword }
 * 2.2. update other admin password: prohibited
 *
 * @param model - admin
 *
 * - user - (super-)admin who is updating
 * - docFromId - (super-)admin who is being updated
 *
 * This function may fail for several reasons
 * - if new password entries do not match
 * - if new password and current password is the same
 * - if new password is weak
 * - if current password is incorrect
 * - if admin tries to update another admin password
 */
export const updateAdmin = (model) => (req, res, next) => {
  const { body, user, docFromId } = req;

  const validatePassword = () => {
    const { currentPassword, newPassword, newPasswordAgain } = body;
    test.updatePasswordObject(body);
    passwordStrengthTest(newPassword);

    if (newPassword !== newPasswordAgain) {
      logger.info('new passwords do not match');
      throw err.BadRequest('new passwords do not match');
    }

    if (newPassword === currentPassword) {
      throw err.BadRequest('new password is the same as current');
    }

    if (!docFromId.authenticate(currentPassword)) {
      logger.info('provided current password is wrong');
      throw err.Forbidden('wrong current password');
    }
  };

  if (user.role === 0) {
    if (user._id.equals(docFromId._id)) {
      // 1.1
      validatePassword();
      const { newPassword } = body;
      const update = new Admins(docFromId);
      update.passwordHash = update.hashPassword(newPassword);

      return controllers
        .updateOne(docFromId, update)
        .then((admin) => {
          const { username } = admin;
          logger.info('super-admin password updated by ', { username });
          res.status(202).json({
            status: 'success',
            data: {},
          });
        })
        .catch((error) => setImmediate(() => next(error)));
    }
    // 1.2.
    const temporaryPassword = generate({ ...passwordConfig });
    const update = { passwordHash: docFromId.hashPassword(temporaryPassword) };

    return controllers
      .updateOne(docFromId, update)
      .then((admin) => {
        const { username } = admin;
        logger.info('temporary admin password created by', { username });
        res.status(201).json({
          status: 'success',
          data: { temporaryPassword },
        });
      })
      .catch((error) => setImmediate(() => next(error)));
  } else if (user._id.equals(docFromId._id)) {
    // 2.1.
    validatePassword();
    const { newPassword } = body;
    const update = new Admins(docFromId);
    update.passwordHash = update.hashPassword(newPassword);

    return controllers
      .updateOne(docFromId, update)
      .then((admin) => {
        const { username } = admin;
        logger.info('admin password updated by ', { username });
        res.status(202).json({
          status: 'success',
          data: {},
        });
      })
      .catch((error) => setImmediate(() => next(error)));
  }
  // 2.2.
  const { username } = user;
  logger.warn('admin attempted to update other (super-)admin', { username });
  return setImmediate(() => next(err.Unauthorized()));
};

export const createOne = (model) => (req, res, next) => {
  const { body, user } = req;
  const { username } = user;
  return controllers
    .createOne(model, body, username)
    .then((doc) => {
      logger.info('resource created', { doc, username });
      res.status(201).json({
        status: 'success',
        data: {},
      });
    })
    .catch((error) => {
      if (error.code === 11000) {
        logger.warn('attempted to duplicate document', { error });
        setImmediate(() => next(err.BadRequest('mongodb duplicate key error')));
      } else {
        setImmediate(() => next(error));
      }
    });
};

export const updateOne = () => (req, res, next) => {
  const { docFromId, body, user } = req;
  const { username } = user;
  return controllers
    .updateOne(docFromId, body, username)
    .then((doc) => {
      logger.info('successful update', { doc, username });
      res.status(202).json({
        status: 'success',
        data: {},
      });
    })
    .catch((error) => setImmediate(() => next(error)));
};

export const deleteOne = () => (req, res, next) => {
  const { docFromId, user } = req;
  const { username } = user;
  return controllers
    .deleteOne(docFromId)
    .then((doc) => {
      logger.info('successful delete', { doc, username });
      res.status(202).json({
        status: 'success',
        data: {},
      });
    })
    .catch((error) => setImmediate(() => next(error)));
};

export const getOne = () => (req, res, next) =>
  controllers
    .getOne(req.docFromId)
    .then((doc) =>
      res.status(200).json({
        status: 'success',
        data: doc,
      }),
    )
    .catch((error) => setImmediate(() => next(error)));

export const getAll = (model) => (req, res, next) =>
  controllers
    .getAll(model)
    .then((docs) =>
      res.status(200).json({
        status: 'success',
        data: docs,
      }),
    )
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
        if (!doc) throw err.NotFound('no resource found with this Id');
        req.docFromId = doc;
        next();
      })
      .catch((error) => setImmediate(() => next(error)));
  } else {
    setImmediate(() => next(err.NotFound('not a MongoId')));
  }
};

export const generateControllers = (model, overrides = {}) => {
  const defaults = {
    registerSuperAdmin: registerSuperAdmin(model),
    registerAdmin: registerAdmin(model),
    getAdmins: getAdmins(model),
    getAdmin: getAdmin(model),
    deleteAdmin: deleteAdmin(model),
    updateAdmin: updateAdmin(model),
    findByIdParam: findByIdParam(model),
    getAll: getAll(model),
    getOne: getOne(model),
    getPast: getPast(model),
    getFuture: getFuture(model),
    deleteOne: deleteOne(model),
    updateOne: updateOne(model),
    createOne: createOne(model),
  };

  return { ...defaults, ...overrides };
};
