import { expect } from 'chai';
import * as err from '../../modules/error';
import * as faker from '../../../../helpers/faker';

/*
 * authorisation without-token should be prevented
 *
 * @param result: http response
 */
export const withoutToken = (result) => {
  const { status, data } = result.body;
  const { name, message } = data;

  expect(result).to.have.status(401);
  expect(status).to.equal('fail');
  expect(name).to.equal('UnauthorizedError');
  expect(message).to.equal('No authorization token was found');
};

/*
 * authorisation with-invalid-token should be prevented
 *
 * @param result: http response
 */
export const withInvalidToken = (result) => {
  const { status, data } = result.body;
  const { name, message } = data;

  expect(result).to.have.status(401);
  expect(status).to.equal('fail');
  expect(name).to.equal(err.Unauthorized.name);
  expect(message).to.equal(err.UNAUTHORIZED);
};

/*
 * creating new admin with invalid req.body should be prevented
 *
 * @param result: http response
 */
export const withInvalidReqBody = (result) => {
  const { status, data } = result.body;
  const { name, message } = data;

  expect(result).to.have.status(400);
  expect(status).to.equal('fail');
  expect(name).to.equal(err.BadRequest.name);
  expect(message).to.equal('Proper username and password is required');
};

// request body for POST /admin
export const withShortPassword = { username: faker.username, password: faker.shortPassword };
export const withLongPassword = { username: faker.username, password: faker.longPassword };
export const withWeakPassword = { username: faker.username, password: faker.weakPassword };
export const withWeakPassPhrase = { username: faker.username, password: faker.weakPassPhrase };
export const with8CharacterPassword = { username: faker.username, password: faker.minPassword8 };
