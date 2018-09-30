import proxyquire from 'proxyquire';
import { ok } from 'assert';
import * as validator from 'validator';
import sinon from 'sinon';
import * as bad from '../../api/modules/error';
import { mongoId, badMongoId } from '../helper';

let validate;

describe('MONGOID VALIDATION', () => {
  let badRequestStub;
  let isMongoIdStub;

  beforeEach(() => {
    badRequestStub = sinon.stub(bad, 'BadRequest');
    isMongoIdStub = sinon.stub(validator, 'isMongoId');
  });

  validate = proxyquire('../../validators/mongo.id.js', {
    bad: { BadRequest: badRequestStub },
    validator: { isMongoId: isMongoIdStub },
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should return undefined with valid mongoID', () => {
    isMongoIdStub.withArgs(mongoId).returns(true);
    ok(!validate.isValidMongoID(mongoId));
  });

  it('should throw error with invalid mongoID', () => {
    isMongoIdStub.withArgs(badMongoId).returns(false);
    badRequestStub.throws(new Error('fake error'));

    try {
      validate.isValidMongoID(badMongoId);
    } catch (error) {
      ok(error);
    }
  });

  it('should throw if no mongoID provided', () => {
    isMongoIdStub.withArgs('').returns(false);
    badRequestStub.throws(new Error('fake error'));

    try {
      validate.isValidMongoID();
    } catch (error) {
      ok(error);
    }
  });
});
