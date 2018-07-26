import chai from 'chai';
import chaiHttp from 'chai-http';
import { dropDatabase } from './database';
import { MONGO_ID } from './constants';
import * as assert from './jwt.validation';

chai.use(chaiHttp);

const resources = ['admins', 'info', 'event', 'services', 'blog', 'media'];

/*
 * An attempt to use protected resources without-token, with expired
 * token, and token with invalid-signature, should be prevented.
 */
describe('Token test', () => {
  // prettier-ignore
  resources.map(resourceName =>
    describe(`Route:: ${resourceName.toUpperCase()}`, () => {
      beforeAll(async () => {
        await dropDatabase();
      });

      afterAll(async () => {
        await dropDatabase();
      });

      describe(`GET /${resourceName}`, () => {
        assert.getWithoutToken(resourceName);
        assert.getWithExpiredToken(resourceName);
        assert.getUsingTokenWithInvalidSignature(resourceName);
        assert.getMalformedToken(resourceName);
        assert.getWithBadFormattedToken(resourceName);
      });

      describe(`POST /${resourceName}`, () => {
        assert.postWithoutToken(resourceName);
        assert.postWithExpiredToken(resourceName);
        assert.postUsingTokenWithInvalidSignature(resourceName);
        assert.postMalformedToken(resourceName);
        assert.postWithBadFormattedToken(resourceName);
      });

      describe(`GET /${resourceName}/${MONGO_ID}`, () => {
        assert.getWithoutToken(`${resourceName}/${MONGO_ID}`);
        assert.getWithExpiredToken(`${resourceName}/${MONGO_ID}`);
        assert.getUsingTokenWithInvalidSignature(`${resourceName}/${MONGO_ID}`);
        assert.getMalformedToken(`${resourceName}/${MONGO_ID}`);
        assert.getWithBadFormattedToken(`${resourceName}/${MONGO_ID}`);
      });

      describe(`PUT /${resourceName}/${MONGO_ID}`, () => {
        assert.putWithoutToken(`${resourceName}/${MONGO_ID}`);
        assert.putWithExpiredToken(`${resourceName}/${MONGO_ID}`);
        assert.putUsingTokenWithInvalidSignature(`${resourceName}/${MONGO_ID}`);
        assert.putMalformedToken(`${resourceName}/${MONGO_ID}`);
        assert.putWithBadFormattedToken(`${resourceName}/${MONGO_ID}`);
      });

      describe(`DELETE /${resourceName}/${MONGO_ID}`, () => {
        assert.deleteWithoutToken(`${resourceName}/${MONGO_ID}`);
        assert.deleteWithExpiredToken(`${resourceName}/${MONGO_ID}`);
        assert.deleteUsingTokenWithInvalidSignature(`${resourceName}/${MONGO_ID}`);
        assert.deleteMalformedToken(`${resourceName}/${MONGO_ID}`);
        assert.deleteWithBadFormattedToken(`${resourceName}/${MONGO_ID}`);
      });
    }));
});
