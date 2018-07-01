import { expect } from 'chai';
import isEmpty from 'lodash.isempty';
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
  expect(message).to.equal('proper username and password is required');
};

/*
 * creating new admin with valid req.body should be allowed
 *
 * @param result: http response
 */
export const withValidReqBody = (result) => {
  const { status, data } = result.body;

  expect(result).to.have.status(201);
  expect(status).to.equal('success');
  expect(isEmpty(data)).to.equal(true);
  expect(isEmpty([])).to.equal(true);
};

/*
 * creating new admin with valid req.body should be allowed
 *
 * @param result: http response
 */
export const adminAlreadyExists = (result) => {
  const { status, data } = result.body;
  const { name, message } = data;

  expect(result).to.have.status(400);
  expect(status).to.equal('fail');
  expect(name).to.equal(err.BadRequest.name);
  expect(message).to.equal('Username already exists');
};

/*
 * gets all admin for supper-admin or gets the requesting admin
 * @type {{username: string, password: string}}
 */
export const getAllAdmins = (result, all = true) => {
  const { status, data } = result.body;
  const { admins } = data;

  expect(result).to.have.status(200);
  expect(status).to.equal('success');

  if (all) {
    expect(admins.length).to.be.greaterThan(1);
  } else {
    expect(isEmpty(admins)).to.equal(false);
  }
};

// request body for POST /admin
export const withShortPassword = { username: faker.username, password: faker.shortPassword };
export const withLongPassword = { username: faker.username, password: faker.longPassword };
export const withWeakPassword = { username: faker.username, password: faker.weakPassword };
export const withWeakPassPhrase = { username: faker.username, password: faker.weakPassPhrase };
export const with8CharacterPassword = { username: faker.username, password: faker.minPassword8 };
export const withGoodPassword = { username: faker.adminUsername, password: faker.maxPassword128 };
