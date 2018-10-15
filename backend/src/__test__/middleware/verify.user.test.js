import proxyquire from 'proxyquire';
import { ok } from 'assert';
import sinon from 'sinon';
import * as model from '../../api/resources/admins/admins.model';
import * as validator from '../../validators/un.pw';

let middleware;

describe('SIGNIN MIDDLEWARE', () => {
  let isValidUsernamePasswordStub;
  let adminsStub;
  let reqBodyStub;
  let fakeFindOne;
  let req = {};
  req.body = () => {};
  const res = {};
  let next;
  const user = { username: 'Fake.User', password: 'f4k3p4$$w0rd' };

  beforeEach(() => {
    next = sinon.spy();
    isValidUsernamePasswordStub = sinon.stub(validator, 'isValidUsernamePassword');
    adminsStub = sinon.stub(model, 'Admins');
    reqBodyStub = sinon.stub(req, 'body');
    fakeFindOne = {
      findOne: sinon.stub(),
    };

    delete require.cache[require.resolve('../../middleware/verify.user.js')];
    middleware = proxyquire('../../middleware/verify.user.js', {
      model: { Admins: adminsStub },
      validator: { isValidUsernamePassword: isValidUsernamePasswordStub },
      req: { body: reqBodyStub },
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should throw if req.body have no username and password object', () => {
    req = { body: {} };
    isValidUsernamePasswordStub.throws(new Error('fake error'));
    middleware.verifyUser(req, res, next);
    ok(!adminsStub.called);
    ok(next.called);
  });

  it.skip('should throw if user not found', () => {
    // TODO WIP
    isValidUsernamePasswordStub.withArgs('fakeBody').returns(undefined);
    adminsStub.withArgs('fakeBody').returns(null);
    fakeFindOne.withArgs('fakeBody').returns(user);
    adminsStub.withArgs('').returns(fakeFindOne);
  });
});
