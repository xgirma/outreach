import { Validator } from 'jsonschema/lib/index';
import * as err from './error';
import logger from './logger';

const validator = new Validator();

// POST /admins create admin request body schema
export const createAdmin = {
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
 * Test if req.body have proper createAdmin schema
 *
 * This function may fail for several reasons
 * - invalid request body
 */
export const testCreateAdmin = (body) => {
  const testBody = validator.validate(body, createAdmin);

  if (testBody.errors.length > 0) {
    const { errors } = testBody;
    logger.warn('Request body validation error', { errors });
    throw err.BadRequest('Proper username and password is required');
  }
};
