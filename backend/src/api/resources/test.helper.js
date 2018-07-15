/* eslint-disable  no-unused-expressions */
import { expect } from 'chai';
import isEmpty from 'lodash.isempty';

export const putSuccess = (result) => {
  const { status, data } = result.body;

  expect(result).to.have.status(202);
  expect(status).to.equal('success');
  expect(isEmpty(data)).to.be.true;
};

export const postSuccess = (result) => {
  const { status, data } = result.body;

  expect(result).to.have.status(201);
  expect(status).to.equal('success');
  expect(isEmpty(data)).to.be.true;
};

export const deleteSuccess = (result) => {
  const { status, data } = result.body;

  expect(result).to.have.status(202);
  expect(status).to.equal('success');
  expect(isEmpty(data)).to.be.true;
};

//  for both GET one or GET all
export const getSuccess = (result) => {
  const { status, data } = result.body;

  expect(result).to.have.status(200);
  expect(status).to.equal('success');
  expect(isEmpty(data)).to.be.false;
};
