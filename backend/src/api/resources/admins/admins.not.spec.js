import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../server';
import { dropDb } from '../../../../helpers/dropDb';
import * as assert from '../../../../helpers/response.validation';
import * as faker from '../../../../helpers/faker';
import * as assertAdmin from './test.helper';

chai.use(chaiHttp);
const resourceName = 'admins';
const adminUser = faker.model.admin;

describe.only(`Route: ${resourceName.toUpperCase()}`, () => {
  beforeAll(async () => {
    await dropDb();
  });

  afterAll(async () => {
    await dropDb();
  });

  /*
   * Test case: an attempt to use protected resources
   * without-token or with-invalid-token, should be prevented.
   */
  describe(`${resourceName.toUpperCase()}: without-token or with-invalid-token`, () => {
    describe(`POST /${resourceName}`, () => {
      test(`should not create ${resourceName} without-token`, async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName}`)
          .send({ ...adminUser });

        assert.noToken(result);
      });

      test(`should not create ${resourceName} with-invalid-token`, async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName}`)
          .set('Authorization', `Bearer ${faker.badToken}`)
          .send({ ...adminUser });

        assert.invalidToken(result);
      });
    });

    describe(`GET /${resourceName}`, () => {
      test(`should not get ${resourceName} without-token`, async () => {
        const result = await chai.request(app).get(`/api/v1/${resourceName}`);

        assert.noToken(result);
      });

      test(`should not get ${resourceName} with-invalid-token`, async () => {
        const result = await chai
          .request(app)
          .get(`/api/v1/${resourceName}`)
          .set('Authorization', `Bearer ${faker.badToken}`);

        assert.invalidToken(result);
      });
    });

    describe(`GET /${resourceName}/${faker.mongoId}`, () => {
      test(`should not get ${resourceName}/${faker.mongoId} without-token`, async () => {
        const result = await chai.request(app).get(`/api/v1/${resourceName}/${faker.mongoId}`);

        assert.noToken(result);
      });

      test(`should not get ${resourceName}/${faker.mongoId} with-invalid-token`, async () => {
        const result = await chai
          .request(app)
          .get(`/api/v1/${resourceName}/$w{faker.mongoId}`)
          .set('Authorization', `Bearer ${faker.badToken}`);

        assert.invalidToken(result);
      });
    });

    describe(`PUT /${resourceName}/${faker.mongoId}`, () => {
      test(`should not update ${resourceName}/${faker.mongoId} without-token`, async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName}/${faker.mongoId}`)
          .send(assertAdmin.withGoodPassword);

        assert.noToken(result);
      });

      test(`should not update ${resourceName}/${faker.mongoId} with-invalid-token`, async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName}/${faker.mongoId}`)
          .set('Authorization', `Bearer ${faker.badToken}`)
          .send(assertAdmin.withGoodPassword);

        assert.invalidToken(result);
      });
    });

    describe(`DELETE /${resourceName}/${faker.mongoId}`, () => {
      test(`should not delete ${resourceName}/${faker.mongoId} without-token`, async () => {
        const result = await chai.request(app).delete(`/api/v1/${resourceName}/${faker.mongoId}`);

        assert.noToken(result);
      });

      test(`should not delete ${resourceName}/${faker.mongoId} with-invalid-token`, async () => {
        const result = await chai
          .request(app)
          .delete(`/api/v1/${resourceName}/${faker.mongoId}`)
          .set('Authorization', `Bearer ${faker.badToken}`);

        assert.invalidToken(result);
      });
    });
  });
});
