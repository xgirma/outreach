import proxyquire from 'proxyquire';
import { ok, deepStrictEqual } from 'assert';
import sinon from 'sinon';
import * as sign from '../../lib/sign.token';
import { expiredToken as token, mongoId as id } from '../helper';

let middleware;
const role = 0;

describe('SIGNIN MIDDLEWARE', () => {
  let signTokenStub;
  let resStatusStub;
  let req = {};
  const res = {};
  res.status = () => {};
  let next;
  let fakeJson = {};

  beforeEach(() => {
    signTokenStub = sinon.stub(sign, 'signToken');
    resStatusStub = sinon.stub(res, 'status');
    next = sinon.spy();
    fakeJson = {
      json: sinon.stub(),
    };

    delete require.cache[require.resolve('../../middleware/signin.token.js')];
    middleware = proxyquire('../../middleware/signin.token.js', {
      sign: { signToken: signTokenStub },
      res: { status: resStatusStub },
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should end the request-response cycle', () => {
    req = { user: { id, role } };
    signTokenStub.withArgs(id, role).returns(token);
    resStatusStub.withArgs(200).returns(fakeJson);
    middleware.signinToken(req, res, next);
    ok(signTokenStub.calledOnce);
    ok(resStatusStub.calledOnce);
    ok(!next.called);
  });

  it('should throw if req.user not passed', () => {
    req = {};
    signTokenStub.withArgs(id, role).returns(token);
    middleware.signinToken(req, res, (error) => {
      deepStrictEqual(error.name, 'BadRequest');
      deepStrictEqual(error.message, 'request with no user data');
    });
    ok(signTokenStub.notCalled);
    ok(resStatusStub.notCalled);
  });

  it('should throw if token generation fails', () => {
    req = { user: { id, role } };
    signTokenStub.throws(new Error('fake error'));
    middleware.signinToken(req, res, next);
    ok(signTokenStub.called);
    ok(!resStatusStub.calledOnce);
    ok(next.called);
  });
});
