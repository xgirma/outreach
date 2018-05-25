/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/server';

chai.use(chaiHttp);

const createApiSpec = (MongooseModel, resourceName, newResource, params, updateResource) => {
  describe(`/${resourceName}`, () => {
    describe(`POST /${resourceName}`, () => {
      it(`should post ${resourceName}`, async () => {
        const create = await chai
          .request(app)
          .post(`/api/v1/${resourceName}`)
          .send(newResource);

        expect(create).to.have.status(201);
        expect(create).to.be.json;
      });
    });

    describe(`GET /${resourceName}`, () => {
      it(`should get all ${resourceName}`, async () => {
        const find = await chai.request(app).get(`/api/v1/${resourceName}`);

        expect(find).to.have.status(200);
        expect(find).to.be.json;
      });
    });

    describe(`GET /${resourceName}/${params.id}`, () => {
      it(`should get ${resourceName} by ${params.id}`, async () => {
        const find = await chai.request(app).get(`/api/v1/${resourceName}/${params.id}`);

        expect(find).to.have.status(200);
        expect(find).to.be.json;
      });
    });

    describe(`PUT /${resourceName}/${params.id}`, () => {
      it(`should get ${resourceName} by ${params.id}`, async () => {
        const change = await chai
          .request(app)
          .put(`/api/v1/${resourceName}/${params.id}`)
          .send(updateResource);

        expect(change).to.have.status(201);
        expect(change).to.be.json;
      });
    });

    describe(`DELETE /${resourceName}/${params.id}`, () => {
      it(`should get ${resourceName} by ${params.id}`, async () => {
        const remove = await chai.request(app).delete(`/api/v1/${resourceName}/${params.id}`);

        expect(remove).to.have.status(201);
        expect(remove).to.be.json;
      });
    });
  });
};

export default createApiSpec;
