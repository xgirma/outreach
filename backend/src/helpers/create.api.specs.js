import chaiHttp from 'chai-http';
import chai from 'chai';
import { dropDb } from './db.helpers';
import app from '../';

const basePath = `/${process.env.BASE_PATH}`;

chai.use(chaiHttp);

const createApiSpec = (model, resourceName, newResource) => {
  describe(`/${resourceName}`, () => {
    beforeEach(async () => {
      await dropDb();
    });

    afterEach(async () => {
      await dropDb();
    });

    describe(`GET /${resourceName}`, () => {
      test(`should get all ${resourceName}`, async () => {
        const result = await chai.request(app).get(`${basePath}/${resourceName}`);

        expect(result).toEqual(200);
        expect(result.type).toEqual('application/json');
      });
    });

    describe(`PUT /${resourceName}`, () => {
      test(`should create a ${resourceName}`, async () => {
        const result = await chai
          .request(app)
          .put(`${basePath}/${resourceName}`)
          .send(newResource);

        expect(result).toEqual(201);
        expect(result.type).toEqual('application/json');
      });
    });

    describe(`POST /${resourceName}`, () => {
      test(`should create a ${resourceName}`, async () => {
        const result = await chai
          .request(app)
          .post(`${basePath}/${resourceName}`)
          .send(newResource);

        expect(result).toEqual(201);
        expect(result.type).toEqual('application/json');
      });
    });
  });
};

export default createApiSpec;
