import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/server';

chai.use(chaiHttp);

const createApiSpec = (MongooseModel, resourceName, newResource, params, updateResource) => {
  describe(`/${resourceName}`, () => {
    describe(`POST /${resourceName}`, () => {
      it(`should post ${resourceName}`, async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName}`)
          .send(newResource);

        expect(result).to.have.status(201);
        expect(result).to.have.header('content-type', 'application/json; charset=utf-8');
      });
    });

    describe(`GET /${resourceName}`, () => {
      it(`should get all ${resourceName}`, async () => {
        const result = await chai.request(app).get(`/api/v1/${resourceName}`);

        expect(result).to.have.status(200);
        expect(result).to.have.header('content-type', 'application/json; charset=utf-8');
      });
    });

    describe(`GET /${resourceName}/${params.id}`, () => {
      it(`should get ${resourceName} by ${params.id}`, async () => {
        const result = await chai.request(app).get(`/api/v1/${resourceName}/${params.id}`);

        expect(result).to.have.status(200);
        expect(result).to.have.header('content-type', 'application/json; charset=utf-8');
      });
    });

    describe(`PUT /${resourceName}/${params.id}`, () => {
      it(`should get ${resourceName} by ${params.id}`, async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName}/${params.id}`)
          .send(updateResource);

        expect(result).to.have.status(201);
        expect(result).to.have.header('content-type', 'application/json; charset=utf-8');
      });
    });

    describe(`DELETE /${resourceName}/${params.id}`, () => {
      it(`should get ${resourceName} by ${params.id}`, async () => {
        const result = await chai.request(app).delete(`/api/v1/${resourceName}/${params.id}`);

        expect(result).to.have.status(201);
        expect(result).to.have.header('content-type', 'application/json; charset=utf-8');
      });
    });
  });
};

export default createApiSpec;
