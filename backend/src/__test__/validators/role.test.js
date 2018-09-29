/* eslint-disable array-callback-return */
import proxyquire from 'proxyquire';
import { expect } from 'chai';
import sinon from 'sinon';
import * as bad from '../../api/modules/error';

let roleValidator;
const noop = () => {};
const valid = [1, 0, '1', '0'];
const invalid = [10, noop, '10', 'o', null, undefined, '', false, {}, [], NaN, -1, [0]];
const fakeErrorName = 'fake error name';

const testValid = async (roles) =>
  roles.map((role) => {
    describe('valid role types', () => {
      let badRequestStub;

      beforeEach(() => {
        badRequestStub = sinon.stub(bad, 'BadRequest');
      });

      roleValidator = proxyquire('../../validators/role.js', {
        bad: { BadRequest: badRequestStub },
      });

      afterEach(() => {
        bad.BadRequest.restore();
      });

      it(`${role} type ${typeof role} is valid role type`, () => {
        expect(roleValidator.isValidRole(role)).to.equal(undefined);
      });
    });
  });

const testInvalid = async (roles) =>
  roles.map((role) => {
    describe('invalid role types', () => {
      let badRequestStub;

      beforeEach(() => {
        badRequestStub = sinon.stub(bad, 'BadRequest');
      });

      roleValidator = proxyquire('../../validators/role.js', {
        bad: { BadRequest: badRequestStub },
      });

      afterEach(() => {
        bad.BadRequest.restore();
      });

      it(`${role} type ${typeof role} is invalid role type`, () => {
        badRequestStub.throws(fakeErrorName);
        try {
          roleValidator.isValidRole(role);
        } catch (error) {
          expect(error).not.to.equal(null);
          expect(error.name).to.equal(fakeErrorName);
        }
      });
    });
  });

describe('ROLE VALIDATION', () => {
  testValid(valid);
  testInvalid(invalid);
});
