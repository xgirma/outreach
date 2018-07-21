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

export const badRequest = (result, msg) => {
  const { status, data } = result.body;
  const { name, message } = data;

  expect(result).to.have.status(400);
  expect(status).to.equal('fail');
  expect(name).to.equal(err.BadRequest.name);
  expect(message).to.equal(msg || err.BadRequest.message);
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

/*
 * have valid-token, however not authorised for the resource
 *
 * @param result: http response
 */
export const unauthorized = (result) => {
  jsonContent(result);
  const { status, data } = result.body;
  const { name, message } = data;

  expect(result).to.have.status(401);
  expect(status).to.equal('fail');
  expect(name).to.equal(err.Unauthorized.name);
  expect(message).to.equal(err.UNAUTHORIZED);
};

/*
 * forbidden
 *
 * @param result: http response
 */
export const forbidden = (result, msg) => {
  const { status, data } = result.body;
  const { name, message } = data;

  expect(result).to.have.status(403);
  expect(status).to.equal('fail');
  expect(name).to.equal(err.Forbidden.name);
  expect(message).to.equal(msg || err.Forbidden.message);
};

/*
 * creating new (super-)admin with weak password should be prevented
 *
 * @param result: http response
 */
export const registerWithWeakPassword = (result) => {
  const { status, data } = result.body;
  const { name, message } = data;

  expect(result).to.have.status(400);
  expect(status).to.equal('fail');
  expect(name).to.equal(err.WeakPassword.name);
  expect(message).to.equal(`${co.WEAK_PASSWORD_ERRORS.join(' ')}`);
};

/*
 * updating the password of (super-)admin with weak password should be prevented
 *
 * @param result: http response
 */
export const updateWithWeakPassword = (result) => {
  const { status, data } = result.body;
  const { name, message } = data;

  expect(result).to.have.status(400);
  expect(status).to.equal('fail');
  expect(name).to.equal(err.WeakPassword.name);
  expect(message).to.equal(`${co.WEAK_PASSWORD_ERRORS.join(' ')}`);
};

/*
 * creating new (super-)admin with weak pass-phrase should be prevented
 *
 * @param result: http response
 */
export const registerWithWeakPassPhrase = (result) => {
  const { status, data } = result.body;
  const { name, message } = data;

  expect(result).to.have.status(400);
  expect(status).to.equal('fail');
  expect(name).to.equal(err.WeakPassword.name);
  expect(message).to.equal(`${co.WEAK_PASSWORD_ERRORS[0]} ${co.WEAK_PASSWORD_ERRORS[1]}`);
};

/*
 * updating the password of (super-)admin with weak pass-phrase should be prevented
 *
 * @param result: http response
 */
export const updateWithWeakPassPhrase = (result) => {
  const { status, data } = result.body;
  const { name, message } = data;

  expect(result).to.have.status(400);
  expect(status).to.equal('fail');
  expect(name).to.equal(err.WeakPassword.name);
  expect(message).to.equal(`${co.WEAK_PASSWORD_ERRORS[0]} ${co.WEAK_PASSWORD_ERRORS[1]}`);
};

/*
 * updating the password, the two new passwords do not match
 *
 * @param result: http response
 */
export const newPasswordDoNotMatch = (result) => {
  const { status, data } = result.body;
  const { name, message } = data;

  expect(result).to.have.status(400);
  expect(status).to.equal('fail');
  expect(name).to.equal(err.BadRequest.name);
  expect(message).to.equal('new passwords do not match');
};

/*
 * updating the password, wrong current password
 *
 * @param result: http response
 */
export const wrongCurrentPassword = (result) => {
  const { status, data } = result.body;
  const { name, message } = data;

  expect(result).to.have.status(403);
  expect(status).to.equal('fail');
  expect(name).to.equal(err.Forbidden.name);
  expect(message).to.equal('wrong current password');
};

/*
 * updating the password, new passwords and current password are the same
 *
 * @param result: http response
 */
export const newAndCurrentPasswordAreSame = (result) => {
  const { status, data } = result.body;
  const { name, message } = data;

  expect(result).to.have.status(400);
  expect(status).to.equal('fail');
  expect(name).to.equal(err.BadRequest.name);
  expect(message).to.equal('new password is the same as current');
};

/*
 * creating new (super-)admin while one already exist should be prevented.
 * creating a new admin with already existing admin username should be prevented.
 *
 * @param result: http response
 */
export const registerWhileExist = (result) => {
  const { status, data } = result.body;
  const { name, message } = data;

  expect(result).to.have.status(403);
  expect(status).to.equal('fail');
  expect(name).to.equal(err.Forbidden.name);
  expect(message).to.equal('user already exists');
};

/*
 * update (super-)admin data with bad req.body should be prevented
 *
 * @param result: http response
 */
export const updateWithBadRequestBody = (result) => {
  const { status, data } = result.body;
  const { name, message } = data;

  expect(result).to.have.status(400);
  expect(status).to.equal('fail');
  expect(name).to.equal(err.BadRequest.name);
  expect(message).to.equal('proper current and new password is required');
};

/*
 * not found
 */
export const notFound = (result, msg) => {
  jsonContent(result);
  const { status, data } = result.body;
  const { name, message } = data;

  expect(result).to.have.status(404);
  expect(status).to.equal('fail');
  expect(name).to.equal(err.NotFound.name);
  expect(message).to.equal(msg || err.RESOURCE_NOT_FOUND);
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
