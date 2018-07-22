import { Validator } from 'jsonschema';
import * as err from './error';
import logger from './logger';

const validator = new Validator();

// POST /admins - request body
const createAdmin = {
  type: 'object',
  properties: {
    username: { type: 'string', required: true },
    password: {
      type: 'string',
      minLength: 8,
      maxLength: 128,
      required: true,
    },
  },
  minProperties: 2,
  maxProperties: 2,
};

/*
 * Test if req.body have proper schema
 *
 * This function may fail for several reasons
 * - invalid request body
 */
export const createAdminBody = (body) => {
  const testBody = validator.validate(body, createAdmin);

  if (testBody.errors.length > 0) {
    const { errors } = testBody;
    logger.warn('request body validation error', { errors });
    throw err.BadRequest('proper username and password is required');
  }
};

// PUT /admins - request body
const updateAdmin = {
  type: 'object',
  properties: {
    currentPassword: {
      type: 'string',
      minLength: 8,
      maxLength: 128,
      required: true,
    },
    newPassword: {
      type: 'string',
      minLength: 8,
      maxLength: 128,
      required: true,
    },
    newPasswordAgain: {
      type: 'string',
      minLength: 8,
      maxLength: 128,
      required: true,
    },
  },
  minProperties: 3,
  maxProperties: 3,
};

/*
 * Test if req.body have proper schema
 *
 * This function may fail for several reasons
 * - invalid request body
 */
export const adminUpdateBody = (body) => {
  const testBody = validator.validate(body, updateAdmin);

  if (testBody.errors.length > 0) {
    const { errors } = testBody;
    logger.warn('request body validation error', { errors });
    throw err.BadRequest('proper current and new password is required');
  }
};
