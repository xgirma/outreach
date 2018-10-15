import proxyquire from 'proxyquire';
import { ok, deepStrictEqual } from 'assert';
import sinon from 'sinon';
import * as bad from '../../api/modules/error';

let validator;
const noop = () => {};
const valid = [1, 0, '1', '0'];
const invalid = [10, noop, '10', 'o', null, undefined, '', false, {}, [], NaN, -1, [0]];

const testValid = (roles) =>
  roles.map((role) =>
    describe('valid role types', () => {
      let badRequestStub;

      beforeEach(() => {
        badRequestStub = sinon.stub(bad, 'BadRequest');
      });

      validator = proxyquire('../../validators/role.js', {
        bad: { BadRequest: badRequestStub },
      });

      afterEach(() => {
        sinon.restore();
      });

      it(`${role} type ${typeof role} is valid role type`, () => {
        deepStrictEqual(validator.isValidRole(role), undefined);
      });
    }),
  );

const testInvalid = (roles) =>
  roles.map((role) =>
    describe('invalid role types', () => {
      let badRequestStub;

      beforeEach(() => {
        badRequestStub = sinon.stub(bad, 'BadRequest');
      });

      validator = proxyquire('../../validators/role.js', {
        bad: { BadRequest: badRequestStub },
      });

      afterEach(() => {
        sinon.restore();
      });

      it(`${role} type ${typeof role} is invalid role type`, () => {
        badRequestStub.throws(new Error('fake error'));
        try {
          validator.isValidRole(role);
        } catch (error) {
          ok(error);
        }
      });
    }),
  );

describe('ROLE VALIDATION', () => {
  testValid(valid);
  testInvalid(invalid);
});
