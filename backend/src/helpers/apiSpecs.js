import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/server';
import { ok, created } from './assertions';

chai.use(chaiHttp);

const createApiSpec = (MongooseModel, resourceName, newResource, params, updateResource) => {
  describe(`/${resourceName}`, () => {
    describe(`POST /${resourceName}`, () => {
      test(`should post ${resourceName}`, async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName}`)
          .send(newResource);

        created(result);
      });
    });

    describe(`GET /${resourceName}`, () => {
      test(`should get all ${resourceName}`, async () => {
        const result = await chai.request(app).get(`/api/v1/${resourceName}`);

        ok(result);
      });
    });

    describe(`GET /${resourceName}/${params.id}`, () => {
      test(`should get ${resourceName} by ${params.id}`, async () => {
        const result = await chai.request(app).get(`/api/v1/${resourceName}/${params.id}`);

        ok(result);
      });
    });

    describe(`PUT /${resourceName}/${params.id}`, () => {
      test(`should get ${resourceName} by ${params.id}`, async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName}/${params.id}`)
          .send(updateResource);

        created(result);
      });
    });

    describe(`DELETE /${resourceName}/${params.id}`, () => {
      test(`should get ${resourceName} by ${params.id}`, async () => {
        const result = await chai.request(app).delete(`/api/v1/${resourceName}/${params.id}`);

        created(result);
      });
    });
  });
};

export default createApiSpec;
