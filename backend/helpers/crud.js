/* eslint-disable no-underscore-dangle */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { notFound, ok, created } from './http.status.assertion';

require('dotenv').config();

const url = `${process.env.HOST}:${process.env.PORT}/${process.env.BASE_PATH}`;
const badId = 200220202;

chai.use(chaiHttp);

const crud = (resourceName, fakerData, moreFakerData) => {
  const id = fakerData._id;
  describe('event', () => {
    test(`POST /${resourceName}`, async () => {
      const result = await chai
        .request(url)
        .post(`/${resourceName}`)
        .send(fakerData);

      created(result);
    });

    test(`GET /${resourceName}`, async () => {
      const result = await chai.request(url).get(`/${resourceName}`);

      ok(result);
    });

    test(`GET /${resourceName}/{id}`, async () => {
      const result = await chai.request(url).get(`/${resourceName}/${id}`);

      ok(result);
    });

    test(`GET /${resourceName}/{id}: non existing`, async () => {
      const result = await chai.request(url).get(`/${resourceName}/${badId}`);

      notFound(result);
    });

    test(`PUT /${resourceName}/{id}`, async () => {
      const result = await chai
        .request(url)
        .put(`/${resourceName}/${id}`)
        .send(moreFakerData);

      created(result);
    });

    test(`DELETE /${resourceName}/{id}`, async () => {
      const result = await chai.request(url).delete(`/${resourceName}/${id}`);

      created(result);
    });

    test(`DELETE /${resourceName}/{id}: non existing`, async () => {
      const result = await chai.request(url).delete(`/${resourceName}/${badId}`);

      notFound(result);
    });
  });
};

export default crud;
