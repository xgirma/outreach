import proxyquire from 'proxyquire';
import jwt from 'jsonwebtoken';
import { expect } from 'chai';
import sinon from 'sinon';
import * as id from '../../validators/mongo.id';
import * as role from '../../validators/role';

let auth;

describe('signToken', () => {
  let isValidMongoIDStub;
  let isValidRoleStub;
  const mongoID = '5b1de7ac698c71055ef657f3';
  const roleType = '0';
  const fakeErrorName = 'fake error name';

  beforeEach(() => {
    isValidRoleStub = sinon.stub(role, 'isValidRole');
    isValidMongoIDStub = sinon.stub(id, 'isValidMongoID');
    auth = proxyquire('../../lib/sign.token.js', {
      id: { isValidRole: isValidRoleStub },
      role: { isValidMongoID: isValidMongoIDStub },
    });
  });

  afterEach(() => {
    role.isValidRole.restore();
    id.isValidMongoID.restore();
  });

  it('should return token', () => {
    isValidMongoIDStub.withArgs(mongoID).returns(undefined);
    isValidRoleStub.withArgs(roleType).returns(undefined);

    expect(auth.signToken(mongoID, roleType)).to.be.an('string');
    jwt.verify(auth.signToken(mongoID, roleType), process.env.JWT_SECRET, (error, decoded) => {
      expect(error).to.equal(null);
      expect(decoded).to.have.property('id');
      expect(decoded).to.have.property('role');
      expect(decoded.id).to.equal(mongoID);
      expect(decoded.role).to.equal(roleType);
    });
  });

  it('bad mongoID should throw error', async () => {
    isValidMongoIDStub.throws(fakeErrorName);
    isValidRoleStub.withArgs(roleType).returns(undefined);

    try {
      auth.signToken(mongoID, roleType);
    } catch (error) {
      expect(error).not.to.equal(null);
      expect(error.name).to.equal(fakeErrorName);
    }
  });

  it('bad role should throw error', async () => {
    isValidMongoIDStub.withArgs(mongoID).returns(undefined);
    isValidRoleStub.throws(fakeErrorName);

    try {
      auth.signToken(mongoID, roleType);
    } catch (error) {
      expect(error).not.to.equal(null);
      expect(error.name).to.equal(fakeErrorName);
    }
  });
});
