import { expect } from 'chai';
import isEmpty from 'lodash.isempty';

const testEmptySuccess = (data) => expect(isEmpty(data)).to.be.true;
const testEmptyFail = (data) => expect(isEmpty(data)).to.be.false;

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
  testEmptyFail(data);
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
