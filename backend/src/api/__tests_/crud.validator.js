import { expect } from 'chai';
import isEmpty from 'lodash.isempty';
import * as err from '../modules/error';
import * as co from './constants';

const testEmptySuccess = (data) => expect(isEmpty(data)).to.be.true;
const testNonEmpty = (data) => expect(isEmpty(data)).to.be.false;

const jsonContent = (result) => {
  expect(result).to.have.header('content-type', 'application/json; charset=utf-8');
};

/*
 * success and return some data
 */
export const getSuccess = (result) => {
  jsonContent(result);
  const { status, data } = result.body;

  expect(result).to.have.status(200);
  expect(status).to.equal('success');
  testNonEmpty(data);
};

/*
 * success and return token
 */
export const signinSuccess = (result) => {
  jsonContent(result);
  const { status, data } = result.body;
  const { token } = data;

  expect(result).to.have.status(200);
  expect(status).to.equal('success');
  expect(token).not.to.equal('');
};

/*
 * success but return no data
 */
export const getSuccessNoData = (result) => {
  jsonContent(result);
  const { status, data } = result.body;

  expect(result).to.have.status(200);
  expect(status).to.equal('success');
  testEmptySuccess(data);
};

/*
 * success and return no data
 */
export const postSuccess = (result) => {
  jsonContent(result);
  const { status, data } = result.body;

  expect(result).to.have.status(201);
  expect(status).to.equal('success');
  testEmptySuccess(data);
};

/*
 * create new admin, success and return no data
 */
export const postSuccessTemporaryPassword = (result) => {
  jsonContent(result);
  const { status, data } = result.body;

  expect(result).to.have.status(201);
  expect(status).to.equal('success');
  expect(data.temporaryPassword).not.to.equal('');
};

/*
 * update password, success and return temporary data
 */
export const putSuccessTemporaryPassword = (result) => {
  jsonContent(result);
  const { status, data } = result.body;

  expect(result).to.have.status(201);
  expect(status).to.equal('success');
  expect(data.temporaryPassword).not.to.equal('');
};

/*
 * success and return token
 */
export const registerSuccess = (result) => {
  jsonContent(result);
  const { status, data } = result.body;
  const { token } = data;

  expect(result).to.have.status(201);
  expect(status).to.equal('success');
  expect(token).not.to.equal('');
};

/*
 * success and return data
 */
export const postSuccessData = (result) => {
  jsonContent(result);
  const { status, data } = result.body;

  expect(result).to.have.status(201);
  expect(status).to.equal('success');
  testNonEmpty(data);
};

/*
 * success and return no data
 */
export const putSuccess = (result) => {
  jsonContent(result);
  const { status, data } = result.body;

  expect(result).to.have.status(202);
  expect(status).to.equal('success');
  testEmptySuccess(data);
};

/*
 * success and return no data
 */
export const deleteSuccess = (result) => {
  jsonContent(result);
  const { status, data } = result.body;

  expect(result).to.have.status(202);
  expect(status).to.equal('success');
  testEmptySuccess(data);
};

/*
 * supper-admin gets all admins including itself
 * admin only gets itself
 *
 * @param result: http response
 * @param superAdmin: (boolean)
 *    true: get all admins
 *    false: get an admin
 */
export const getAdminSuccess = (result, superAdmin = true) => {
  jsonContent(result);
  const { status, data } = result.body;
  const { admins } = data;

  expect(result).to.have.status(200);
  expect(status).to.equal('success');

  if (superAdmin) {
    expect(admins).to.be.an('array');
  } else {
    expect(admins).to.be.an('object'); // not an array
  }
};

export const badRequest = (result, msg = err.BadRequest().message) => {
  const { status, data } = result.body;
  const { name, message } = data;

  expect(result).to.have.status(400);
  expect(status).to.equal('fail');
  expect(name).to.equal(err.BadRequest().name);
  expect(message).to.equal(msg);
};

/*
 * registering with weak password should be prevented
 */
export const weakPassword = (result) => {
  const { status, data } = result.body;
  const { name, message } = data;

  expect(result).to.have.status(400);
  expect(status).to.equal('fail');
  expect(name).to.equal(err.WeakPassword.name);
  expect(message).to.equal(`${co.WEAK_PASSWORD_ERRORS.join(' ')}`);
};

/*
 * registration with weak pass-phrase should be prevented
 */
export const weakPassPhrase = (result) => {
  const { status, data } = result.body;
  const { name, message } = data;

  expect(result).to.have.status(400);
  expect(status).to.equal('fail');
  expect(name).to.equal(err.WeakPassword.name);
  expect(message).to.equal(`${co.WEAK_PASSWORD_ERRORS[0]} ${co.WEAK_PASSWORD_ERRORS[1]}`);
};

/*
 * bad authorisation with no-token, expired jwt, and invalid signature
 */
export const unauthorizedError = (result) => {
  jsonContent(result);
  const { status, data } = result.body;
  const { name, message } = data;

  expect(result).to.have.status(401);
  expect(status).to.equal('fail');
  expect(name).to.equal('UnauthorizedError');
  expect(co.UNAUTHORIZED_ERROR).to.include(message);
};

export const unauthorized = (result, msg = err.Unauthorized().message) => {
  jsonContent(result);
  const { status, data } = result.body;
  const { name, message } = data;

  expect(result).to.have.status(401);
  expect(status).to.equal('fail');
  expect(name).to.equal(err.Unauthorized().name);
  expect(message).to.equal(msg);
};

/*
 * signin with bad username and password
 */
export const badUsernameOrPassword = (result) => {
  const { status, data } = result.body;
  const { name, message } = data;

  expect(result).to.have.status(403);
  expect(status).to.equal('fail');
  expect(name).to.equal(err.Forbidden.name);
  expect(message).to.equal(err.FORBIDDEN);
};

export const forbidden = (result, msg = err.Forbidden().message) => {
  const { status, data } = result.body;
  const { name, message } = data;

  expect(result).to.have.status(403);
  expect(status).to.equal('fail');
  expect(name).to.equal(err.Forbidden().name);
  expect(message).to.equal(msg);
};

export const notFound = (result, msg) => {
  jsonContent(result);
  const { status, data } = result.body;
  const { name, message } = data;

  expect(result).to.have.status(404);
  expect(status).to.equal('fail');
  expect(name).to.equal(err.NotFound.name);
  expect(message).to.equal(msg || err.RESOURCE_NOT_FOUND);
};
