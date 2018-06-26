import { expect } from 'chai';
import * as err from '../src/api/modules/error';

const jsonContent = (result) => {
  expect(result).to.have.header('content-type', 'application/json; charset=utf-8');
};

export const internalServerError = (result) => {
  expect(result).to.have.status(500);
  jsonContent(result);
};

export const badRequest = (result) => {
  expect(result).to.have.status(400);
  expect(result.body.data).to.equal(undefined);
  jsonContent(result);
};

export const notFound = (result, msg) => {
  const { status, data } = result.body;
  const { name, message } = data;

  expect(result).to.have.status(404);
  expect(status).to.equal('fail');
  expect(name).to.equal(err.ResourceNotFound.name);
  expect(message).to.equal(msg || err.ResourceNotFound.message);
  jsonContent(result);
};

export const ok = (result) => {
  expect(result).to.have.status(200);
  expect(result.body.data).to.not.equal({});
  jsonContent(result);
};

export const created = (result) => {
  expect(result).to.have.status(201);
  expect(result.body.data).to.not.equal({});
  jsonContent(result);
};
