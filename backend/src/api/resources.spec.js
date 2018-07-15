import chai from 'chai';
import chaiHttp from 'chai-http';
import { dropDb } from '../../helpers/dropDb';
import * as faker from '../../helpers/faker/index';
import * as jwtTest from '../../helpers/jwt.validation';

chai.use(chaiHttp);

const resources = ['admins', 'info', 'event', 'service', 'blog', 'media'];

/*
 * An attempt to use protected resources without-token, with expired
 * token, and token with invalid-signature, should be prevented.
 */
describe('Token test', () => {
  resources.map((resourceName) =>
    describe(`Route:: ${resourceName.toUpperCase()}`, () => {
      beforeAll(async () => {
        await dropDb();
      });

      afterAll(async () => {
        await dropDb();
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

      describe(`GET /${resourceName}/${faker.mongoId}`, () => {
        jwtTest.getWithoutToken(`${resourceName}/${faker.mongoId}`);
        jwtTest.getWithExpiredToken(`${resourceName}/${faker.mongoId}`);
        jwtTest.getUsingTokenWithInvalidSignature(`${resourceName}/${faker.mongoId}`);
        jwtTest.getMalformedToken(`${resourceName}/${faker.mongoId}`);
        jwtTest.getWithBadFormattedToken(`${resourceName}/${faker.mongoId}`);
      });

      describe(`PUT /${resourceName}/${faker.mongoId}`, () => {
        jwtTest.putWithoutToken(`${resourceName}/${faker.mongoId}`);
        jwtTest.putWithExpiredToken(`${resourceName}/${faker.mongoId}`);
        jwtTest.putUsingTokenWithInvalidSignature(`${resourceName}/${faker.mongoId}`);
        jwtTest.putMalformedToken(`${resourceName}/${faker.mongoId}`);
        jwtTest.putWithBadFormattedToken(`${resourceName}/${faker.mongoId}`);
      });

      describe(`DELETE /${resourceName}/${faker.mongoId}`, () => {
        jwtTest.deleteWithoutToken(`${resourceName}/${faker.mongoId}`);
        jwtTest.deleteWithExpiredToken(`${resourceName}/${faker.mongoId}`);
        jwtTest.deleteUsingTokenWithInvalidSignature(`${resourceName}/${faker.mongoId}`);
        jwtTest.deleteMalformedToken(`${resourceName}/${faker.mongoId}`);
        jwtTest.deleteWithBadFormattedToken(`${resourceName}/${faker.mongoId}`);
      });
    }),);
});
