import proxyquire from 'proxyquire';
import { expect } from 'chai';
import * as validator from 'validator';
import sinon from 'sinon';
import * as bad from '../../api/modules/error';

let mongoIdValidtor;
const goodMongoID = '5b1de7ac698c71055ef657f3';
const badMongoID = ['5b1de7ac698c71', ''];
const fakeErrorName = 'fake error name';

describe('MONGOID VALIDATION', () => {
  let badRequestStub;
  let isMongoIdStub;

  beforeEach(() => {
    badRequestStub = sinon.stub(bad, 'BadRequest');
    isMongoIdStub = sinon.stub(validator, 'isMongoId');
  });

  mongoIdValidtor = proxyquire('../../validators/mongo.id.js', {
    bad: { BadRequest: badRequestStub },
    validator: { isMongoId: isMongoIdStub },
  });

  afterEach(() => {
    bad.BadRequest.restore();
    validator.isMongoId.restore();
  });

  it('should return undefined with valid mongoID', () => {
    isMongoIdStub.withArgs(goodMongoID).returns(true);
    expect(mongoIdValidtor.isValidMongoID(goodMongoID)).to.equal(undefined);
  });

  it('should throw error with invalid mongoID', () => {
    isMongoIdStub.withArgs(badMongoID[0]).returns(false);
    badRequestStub.throws(fakeErrorName);

    try {
      mongoIdValidtor.isValidMongoID(goodMongoID[0]);
    } catch (error) {
      expect(error).not.to.equal(null);
      expect(error.name).to.equal(fakeErrorName);
    }
  });

  it('should throw if no mongoID provided', () => {
    isMongoIdStub.withArgs(badMongoID[1]).returns(false);
    badRequestStub.throws(fakeErrorName);

    try {
      mongoIdValidtor.isValidMongoID(badMongoID[1]);
    } catch (error) {
      expect(error).not.to.equal(null);
      expect(error.name).to.equal(fakeErrorName);
    }
  });
});
