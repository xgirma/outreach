import { Validator } from 'jsonschema';
import { BadRequest } from '../api/modules/error';
import logger from '../api/modules/logger';

const schema = new Validator();

const expectedSchema = {
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

/**
 * username and password schema validator
 * @param input: object
 * @throws 400
 * @return undefined
 */
export const isValidUsernamePassword = (input) => {
  const test = schema.validate(input, expectedSchema);

  if (test.errors.length > 0) {
    logger.debug('username and password schema failed', test.errors);
    throw BadRequest('proper username and password is required');
  }
};
