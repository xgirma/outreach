import { expect } from 'chai';
import * as err from '../../modules/error';

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
