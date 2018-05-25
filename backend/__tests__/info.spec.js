import chai from 'chai';
import chaiHttp from 'chai-http';
import churchInfo from '../src/helpers/faker.info';

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

    expect(result.status).toEqual(201);
    expect(result.type).toEqual('application/json');
    expect(result.request.url).toEqual(`${url}/info`);
    expect(result.request.method).toEqual('post');
    expect(result.body.data).not.toEqual({});
  });

  test('POST /info/{id}: invalid schema', async () => {
    const requestBody = churchInfo();
    requestBody.am.email = 'info@gedamorg';
    requestBody._id = 200;
    const result = await chai
      .request(url)
      .post('/info')
      .send(requestBody);

    expect(result.status).toEqual(500);
    expect(result.type).toEqual('application/json');
    expect(result.request.url).toEqual(`${url}/info`);
    expect(result.request.method).toEqual('post');
  });

  test('GET /info', async () => {
    const result = await chai.request(url).get('/info');

    expect(result.status).toEqual(200);
    expect(result.type).toEqual('application/json');
    expect(result.request.url).toEqual(`${url}/info`);
    expect(result.request.method).toEqual('get');
    expect(result.body.data).not.toEqual({});
  });

  test('GET /info/{id}', async () => {
    const result = await chai.request(url).get(`/info/${data._id}`);

    expect(result.status).toEqual(200);
    expect(result.type).toEqual('application/json');
    expect(result.request.url).toEqual(`${url}/info/${data._id}`);
    expect(result.request.method).toEqual('get');
    expect(result.body.data).not.toEqual({});
  });

  test('GET /info/{id}: non existing', async () => {
    const result = await chai.request(url).get(`/info/${badId}`);

    expect(result.status).toEqual(404);
    expect(result.type).toEqual('application/json');
    expect(result.request.url).toEqual(`${url}/info/${badId}`);
    expect(result.request.method).toEqual('get');
    expect(result.body.data).toEqual(undefined);
  });

  test('PUT /info/{id}', async () => {
    const result = await chai
      .request(url)
      .put(`/info/${data._id}`)
      .send(churchInfo());

    expect(result.status).toEqual(201);
    expect(result.type).toEqual('application/json');
    expect(result.request.url).toEqual(`${url}/info/${data._id}`);
    expect(result.request.method).toEqual('put');
    expect(result.body.data).not.toEqual({});
  });

  test('PUT /info/{id}: invalid schema', async () => {
    const requestBody = churchInfo();
    requestBody.am.email = 'infoatgedam.org';
    const result = await chai
      .request(url)
      .put(`/info/${data._id}`)
      .send(requestBody);

    expect(result.status).toEqual(500);
    expect(result.type).toEqual('application/json');
    expect(result.request.url).toEqual(`${url}/info/${data._id}`);
    expect(result.request.method).toEqual('put');
  });

  test('DELETE /info/{id}', async () => {
    const result = await chai.request(url).delete(`/info/${data._id}`);

    expect(result.status).toEqual(201);
    expect(result.type).toEqual('application/json');
    expect(result.request.url).toEqual(`${url}/info/${data._id}`);
    expect(result.request.method).toEqual('delete');
  });

  test('DELETE /info/{id}: non existing', async () => {
    const result = await chai.request(url).delete(`/info/${badId}`);

    expect(result.status).toEqual(404);
    expect(result.type).toEqual('application/json');
    expect(result.request.url).toEqual(`${url}/info/${badId}`);
    expect(result.request.method).toEqual('delete');
    expect(result.body.data).toEqual(undefined);
  });
});
