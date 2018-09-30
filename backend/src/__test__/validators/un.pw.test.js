import proxyquire from 'proxyquire';
import { ok } from 'assert';
import sinon from 'sinon';
import { username, password } from '../helper';
import * as bad from '../../api/modules/error';

let validate;

const badUnpws = [
  { username: username.ADMIN, password: password.SHORT },
  { username: username.ADMIN, password: password.LONG },
  { username: username.ADMIN, password: password.NUMERIC },
  { username: username.ADMIN },
  { password: password.NUMERIC },
  { username: username.ADMIN, pass: '1233' },
];

describe('USERNAME AND PASSWORD VALIDATION: GOOD', () => {
  let badRequestStub;
  const goodUnpw = { username: username.ADMIN, password: password.STRONG };

  beforeEach(() => {
    badRequestStub = sinon.stub(bad, 'BadRequest');
  });

  validate = proxyquire('../../validators/un.pw.js', {
    bad: { BadRequest: badRequestStub },
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should return undefined with valid username and password', () => {
    badRequestStub.throws(new Error('fake error'));
    ok(!validate.isValidUsernamePassword(goodUnpw));
    ok(!badRequestStub.called);
  });
});

const testInvalid = (handlers) => {
  handlers.map((handler) =>
    describe('USERNAME AND PASSWORD VALIDATION: BAD', () => {
      let badRequestStub;

      beforeEach(() => {
        badRequestStub = sinon.stub(bad, 'BadRequest');
      });

      validate = proxyquire('../../validators/un.pw.js', {
        bad: { BadRequest: badRequestStub },
      });

      afterEach(() => {
        sinon.restore();
      });

      it('should throw with bad username and password', () => {
        badRequestStub.throws(new Error('fake error'));

        try {
          validate.isValidUsernamePassword(handler);
        } catch (error) {
          ok(error);
          ok(badRequestStub.called);
        }
      });
    }),
  );
};

testInvalid(badUnpws);
