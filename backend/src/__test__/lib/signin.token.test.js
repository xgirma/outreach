import proxyquire from 'proxyquire';
import jwt from 'jsonwebtoken';
import { ok, deepStrictEqual } from 'assert';
import sinon from 'sinon';
import * as id from '../../validators/mongo.id';
import * as role from '../../validators/role';

let lib;

describe('SIGNIN TOKEN', () => {
  let isValidMongoIDStub;
  let isValidRoleStub;
  const mongoID = '5b1de7ac698c71055ef657f3';
  const roleType = '0';

  beforeEach(() => {
    isValidRoleStub = sinon.stub(role, 'isValidRole');
    isValidMongoIDStub = sinon.stub(id, 'isValidMongoID');
    lib = proxyquire('../../lib/sign.token.js', {
      id: { isValidRole: isValidRoleStub },
      role: { isValidMongoID: isValidMongoIDStub },
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should return token', () => {
    isValidMongoIDStub.withArgs(mongoID).returns(undefined);
    isValidRoleStub.withArgs(roleType).returns(undefined);

    const result = lib.signToken(mongoID, roleType);
    deepStrictEqual(typeof result, 'string');

    jwt.verify(lib.signToken(mongoID, roleType), process.env.JWT_SECRET, (error, decoded) => {
      ok(!error);
      deepStrictEqual(decoded.id, mongoID);
      deepStrictEqual(decoded.role, roleType);
    });
  });

  it('bad mongoID should throw error', async () => {
    isValidMongoIDStub.throws(new Error('fake error'));
    isValidRoleStub.withArgs(roleType).returns(undefined);

    try {
      lib.signToken(mongoID, roleType);
    } catch (error) {
      ok(error);
    }
  });

  it('bad role should throw error', async () => {
    isValidMongoIDStub.withArgs(mongoID).returns(undefined);
    isValidRoleStub.throws('fake error');

    try {
      lib.signToken(mongoID, roleType);
    } catch (error) {
      ok(error);
    }
  });
});
