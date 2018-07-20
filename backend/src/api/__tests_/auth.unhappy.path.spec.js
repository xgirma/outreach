import chai from 'chai';
import chaiHttp from 'chai-http';
import { dropDatabase } from './drop.database';
import { MONGO_ID } from './constants';
import * as jwtTest from './jwt.validation';

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
        jwtTest.getWithoutToken(resourceName);
        jwtTest.getWithExpiredToken(resourceName);
        jwtTest.getUsingTokenWithInvalidSignature(resourceName);
        jwtTest.getMalformedToken(resourceName);
        jwtTest.getWithBadFormattedToken(resourceName);
      });

      describe(`POST /${resourceName}`, () => {
        jwtTest.postWithoutToken(resourceName);
        jwtTest.postWithExpiredToken(resourceName);
        jwtTest.postUsingTokenWithInvalidSignature(resourceName);
        jwtTest.postMalformedToken(resourceName);
        jwtTest.postWithBadFormattedToken(resourceName);
      });

      describe(`GET /${resourceName}/${MONGO_ID}`, () => {
        jwtTest.getWithoutToken(`${resourceName}/${MONGO_ID}`);
        jwtTest.getWithExpiredToken(`${resourceName}/${MONGO_ID}`);
        jwtTest.getUsingTokenWithInvalidSignature(`${resourceName}/${MONGO_ID}`);
        jwtTest.getMalformedToken(`${resourceName}/${MONGO_ID}`);
        jwtTest.getWithBadFormattedToken(`${resourceName}/${MONGO_ID}`);
      });

      describe(`PUT /${resourceName}/${MONGO_ID}`, () => {
        jwtTest.putWithoutToken(`${resourceName}/${MONGO_ID}`);
        jwtTest.putWithExpiredToken(`${resourceName}/${MONGO_ID}`);
        jwtTest.putUsingTokenWithInvalidSignature(`${resourceName}/${MONGO_ID}`);
        jwtTest.putMalformedToken(`${resourceName}/${MONGO_ID}`);
        jwtTest.putWithBadFormattedToken(`${resourceName}/${MONGO_ID}`);
      });

      describe(`DELETE /${resourceName}/${MONGO_ID}`, () => {
        jwtTest.deleteWithoutToken(`${resourceName}/${MONGO_ID}`);
        jwtTest.deleteWithExpiredToken(`${resourceName}/${MONGO_ID}`);
        jwtTest.deleteUsingTokenWithInvalidSignature(`${resourceName}/${MONGO_ID}`);
        jwtTest.deleteMalformedToken(`${resourceName}/${MONGO_ID}`);
        jwtTest.deleteWithBadFormattedToken(`${resourceName}/${MONGO_ID}`);
      });
    }));
});
