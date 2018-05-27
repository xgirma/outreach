import chai from 'chai';
import chaiHttp from 'chai-http';
import churchInfo from '../src/helpers/faker.info';
import { internalServerError, notFound, ok, created, badRequest } from '../src/helpers/assertions';

require('dotenv').config();

const url = `${process.env.HOST}:${process.env.PORT}/${process.env.BASE_PATH}`;
const data = churchInfo();
const badId = 1212121212;

chai.use(chaiHttp);

describe('info', () => {
  test('POST /info', async () => {
    const result = await chai
      .request(url)
      .post('/info')
      .send(data);

    created(result);
  });

  test('POST /info/{id}: invalid schema', async () => {
    const requestBody = churchInfo();
    requestBody.am.email = 'info@gedamorg';
    requestBody._id = 200;
    const result = await chai
      .request(url)
      .post('/info')
      .send(requestBody);

    badRequest(result);
  });

  test('GET /info', async () => {
    const result = await chai.request(url).get('/info');

    ok(result);
  });

  test('GET /info/{id}', async () => {
    const result = await chai.request(url).get(`/info/${data._id}`);

    ok(result);
  });

  test('GET /info/{id}: non existing', async () => {
    const result = await chai.request(url).get(`/info/${badId}`);

    notFound(result);
  });

  test('PUT /info/{id}', async () => {
    const result = await chai
      .request(url)
      .put(`/info/${data._id}`)
      .send(churchInfo());

    created(result);
  });

  test('PUT /info/{id}: invalid schema', async () => {
    const requestBody = churchInfo();
    requestBody.email = 'infoatgedam.org';
    const result = await chai
      .request(url)
      .put(`/info/${data._id}`)
      .send(requestBody);

    internalServerError(result);
  });

  test('DELETE /info/{id}', async () => {
    const result = await chai.request(url).delete(`/info/${data._id}`);

    created(result);
  });

  test('DELETE /info/{id}: non existing', async () => {
    const result = await chai.request(url).delete(`/info/${badId}`);

    notFound(result);
  });
});
