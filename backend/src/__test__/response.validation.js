import { expect } from 'chai';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as owasp from 'owasp-password-strength-test';
import {
  testEmptySuccess,
  testNonEmpty,
  jsonContent,
  unauthorizedErrors,
  weakPasswordErrors,
} from './helper';
import * as err from '../api/modules/error';

dotenv.config();
const secret = process.env.JWT_SECRET;

/*
 * For protected resources
 * No authorization token was found
 * jwt expired
 * invalid signature
 * jwt malformed
 * Format is Authorization: Bearer [token]
 */
export const unauthorizedError = (result) => {
  jsonContent(result);
  const { status, data } = result.body;
  const { name, message } = data;

  expect(result).to.have.status(401);
  expect(status).to.equal('error');
  expect(name).to.equal('UnauthorizedError');
  expect(unauthorizedErrors).to.include(message);
};

// GET 200 - OK - return no data
export const getSuccessWithNoData = (result) => {
  jsonContent(result);
  const { status, data } = result.body;

  expect(result).to.have.status(200);
  expect(status).to.equal('success');
  testEmptySuccess(data);
};

// POST 201 - Created - return no data
export const postSuccess = (result) => {
  jsonContent(result);
  const { status, data } = result.body;

  expect(result).to.have.status(201);
  expect(status).to.equal('success');
  testEmptySuccess(data);
};

// GET 200 - OK return some data
export const getSuccess = (result) => {
  jsonContent(result);
  const { status, data } = result.body;

  expect(result).to.have.status(200);
  expect(status).to.equal('success');
  testNonEmpty(data);
};

// 202 - Accepted - return no data
export const putSuccess = (result) => {
  jsonContent(result);
  const { status, data } = result.body;

  expect(result).to.have.status(202);
  expect(status).to.equal('success');
  testEmptySuccess(data);
};

// 202 - Accepted - return no data
export const deleteSuccess = (result) => {
  jsonContent(result);
  const { status, data } = result.body;

  expect(result).to.have.status(202);
  expect(status).to.equal('success');
  testEmptySuccess(data);
};

// 400 - Error: BadRequest
export const badRequest = (result, msg = err.BadRequest().message) => {
  jsonContent(result);
  const { status, data } = result.body;
  const { name, message } = data;

  expect(result).to.have.status(400);
  expect(status).to.equal('error');
  expect(name).to.equal(err.BadRequest().name);
  expect(message).to.equal(msg);
};

// 400 - Error: BadRequest - WeakPassword
export const weakPassword = (result) => {
  jsonContent(result);
  const { status, data } = result.body;
  const { name, message } = data;

  expect(result).to.have.status(400);
  expect(status).to.equal('error');
  expect(name).to.equal(err.WeakPassword.name);
  expect(message).to.equal(`${weakPasswordErrors.join(' ')}`);
};

// 400 - Error: BadRequest - WeakPassword
export const weakPassPhrase = (result) => {
  jsonContent(result);
  const { status, data } = result.body;
  const { name, message } = data;

  expect(result).to.have.status(400);
  expect(status).to.equal('error');
  expect(name).to.equal(err.WeakPassword.name);
  expect(message).to.equal(`${weakPasswordErrors[0]} ${weakPasswordErrors[1]}`);
};

// 201 - Created - with token
export const registerSuccess = (result, done) => {
  jsonContent(result);
  const { status, data } = result.body;
  const { token } = data;

  expect(result).to.have.status(201);
  expect(status).to.equal('success');
  expect(token).not.to.equal('');
  try {
    const decoded = jwt.verify(token, secret);
    expect(decoded.id).not.to.equal('');
    expect(decoded.iat).not.to.equal('');
    expect(decoded.exp).not.to.equal('');
  } catch (error) {
    if (error) {
      done.fail(new Error('registration return bad token'));
    }
  }
};

// 403 - Forbidden - with error
export const forbidden = (result, msg = err.Forbidden().message) => {
  jsonContent(result);
  const { status, data } = result.body;
  const { name, message } = data;

  expect(result).to.have.status(403);
  expect(status).to.equal('error');
  expect(name).to.equal(err.Forbidden().name);
  expect(message).to.equal(msg);
};

// 201 - Created - return temporary password
// can be used as putSuccessTemporaryPassword
export const postSuccessTemporaryPassword = (result) => {
  jsonContent(result);
  const { status, data } = result.body;
  const { temporaryPassword } = data;
  const passwordTest = owasp.test(temporaryPassword);

  expect(result).to.have.status(201);
  expect(status).to.equal('success');
  expect(temporaryPassword).not.to.equal('');
  expect(passwordTest.strong).to.equal(true);
};

// 200 - Ok
export const getAdminSuccess = (result, superAdmin = true) => {
  jsonContent(result);
  const { status, data } = result.body;
  const { admins } = data;

  expect(result).to.have.status(200);
  expect(status).to.equal('success');

  if (superAdmin) {
    expect(admins).to.be.an('array');
  } else {
    expect(admins).to.be.an('object');
  }
};

// 404 - Error: Not Found
export const notFound = (result, msg = err.RESOURCE_NOT_FOUND) => {
  jsonContent(result);
  const { status, data } = result.body;
  const { name, message } = data;

  expect(result).to.have.status(404);
  expect(status).to.equal('error');
  expect(name).to.equal(err.NotFound.name);
  expect(message).to.equal(msg);
};

// 200 - Ok
export const signinSuccess = (result, done) => {
  jsonContent(result);
  const { status, data } = result.body;
  const { token } = data;

  expect(result).to.have.status(200);
  expect(status).to.equal('success');
  expect(token).not.to.equal('');
  try {
    const decoded = jwt.verify(token, secret);
    expect(decoded.id).not.to.equal('');
    expect(decoded.iat).not.to.equal('');
    expect(decoded.exp).not.to.equal('');
  } catch (error) {
    if (error) {
      done.fail(new Error('signin return bad token'));
    }
  }
};

export const unauthorized = (result, msg = err.Unauthorized().message) => {
  jsonContent(result);
  const { status, data } = result.body;
  const { name, message } = data;

  expect(result).to.have.status(401);
  expect(status).to.equal('error');
  expect(name).to.equal(err.Unauthorized().name);
  expect(message).to.equal(msg);
};
