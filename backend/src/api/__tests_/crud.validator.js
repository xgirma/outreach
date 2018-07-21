import { expect } from 'chai';
import isEmpty from 'lodash.isempty';
import * as err from "../modules/error";

const testEmptySuccess = (data) => expect(isEmpty(data)).to.be.true;
const testNonEmpty = (data) => expect(isEmpty(data)).to.be.false;

const jsonContent = (result) => {
  expect(result).to.have.header('content-type', 'application/json; charset=utf-8');
};

// bad authorisation with no-token, expired jwt, and invalid signature
export const unauthorizedError = (result) => {
  jsonContent(result);
  const { status, data } = result.body;
  const { name, message } = data;
  const expectedMessage = [
    'No authorization token was found',
    'jwt expired',
    'invalid signature',
    'jwt malformed',
    'Format is Authorization: Bearer [token]',
  ];

  expect(result).to.have.status(401);
  expect(status).to.equal('fail');
  expect(name).to.equal('UnauthorizedError');
  expect(expectedMessage).to.include(message);
};

// success and return some data
export const getSuccess = (result) => {
  jsonContent(result);
  const { status, data } = result.body;

  expect(result).to.have.status(200);
  expect(status).to.equal('success');
  testNonEmpty(data);
};

// success but return no data
export const getSuccessNoData = (result) => {
  jsonContent(result);
  const { status, data } = result.body;

  expect(result).to.have.status(200);
  expect(status).to.equal('success');
  testEmptySuccess(data);
};

// success and return no data
export const postSuccess = (result) => {
  jsonContent(result);
  const { status, data } = result.body;

  expect(result).to.have.status(201);
  expect(status).to.equal('success');
  testEmptySuccess(data);
};

// success and return no data
export const putSuccess = (result) => {
  jsonContent(result);
  const { status, data } = result.body;

  expect(result).to.have.status(202);
  expect(status).to.equal('success');
  testEmptySuccess(data);
};

// success and return no data
export const deleteSuccess = (result) => {
  jsonContent(result);
  const { status, data } = result.body;

  expect(result).to.have.status(202);
  expect(status).to.equal('success');
  testEmptySuccess(data);
};

// success and return token
export const registerSuccess = (result) => {
  jsonContent(result);
  const { status, data } = result.body;
  const { token } = data;
  
  expect(result).to.have.status(201);
  expect(status).to.equal('success');
  expect(token).not.to.equal('');
};

// success and return token
export const signinSuccess = (result) => {
  jsonContent(result);
  const { status, data } = result.body;
  const { token } = data;
  
  expect(result).to.have.status(200);
  expect(status).to.equal('success');
  expect(token).not.to.equal('');
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
