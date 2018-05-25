import chai from 'chai';
import chaiHttp from 'chai-http';
import churchIntro from '../src/helpers/faker.intro';

require('dotenv').config();

const url = `${process.env.HOST}:${process.env.PORT}/${process.env.BASE_PATH}`;
const data = churchIntro();
const badId = 200220202;

chai.use(chaiHttp);

describe('intro', () => {
  test('POST /intro', async () => {
    const result = await chai
      .request(url)
      .post('/intro')
      .send(data);

    expect(result.status).toEqual(201);
    expect(result.type).toEqual('application/json');
    expect(result.request.url).toEqual(`${url}/intro`);
    expect(result.request.method).toEqual('post');
    expect(result.body.data).not.toEqual({});
  });

  test('GET /intro', async () => {
    const result = await chai.request(url).get('/intro');

    expect(result.status).toEqual(200);
    expect(result.type).toEqual('application/json');
    expect(result.request.url).toEqual(`${url}/intro`);
    expect(result.request.method).toEqual('get');
    expect(result.body.data).not.toEqual({});
  });

  test('GET /intro/{id}', async () => {
    const result = await chai.request(url).get(`/intro/${data._id}`);

    expect(result.status).toEqual(200);
    expect(result.type).toEqual('application/json');
    expect(result.request.url).toEqual(`${url}/intro/${data._id}`);
    expect(result.request.method).toEqual('get');
    expect(result.body.data).not.toEqual({});
  });

  test('GET /intro/{id}: non existing', async () => {
    const result = await chai.request(url).get(`/intro/${badId}`);

    expect(result.status).toEqual(404);
    expect(result.type).toEqual('application/json');
    expect(result.request.url).toEqual(`${url}/intro/${badId}`);
    expect(result.request.method).toEqual('get');
    expect(result.body.data).toEqual(undefined);
  });

  test('PUT /intro/{id}', async () => {
    const result = await chai
      .request(url)
      .put(`/intro/${data._id}`)
      .send(churchIntro());

    expect(result.status).toEqual(201);
    expect(result.type).toEqual('application/json');
    expect(result.request.url).toEqual(`${url}/intro/${data._id}`);
    expect(result.request.method).toEqual('put');
    expect(result.body.data).not.toEqual({});
  });

  test('DELETE /intro/{id}', async () => {
    const result = await chai.request(url).delete(`/intro/${data._id}`);

    expect(result.status).toEqual(201);
    expect(result.type).toEqual('application/json');
    expect(result.request.url).toEqual(`${url}/intro/${data._id}`);
    expect(result.request.method).toEqual('delete');
  });

  test('DELETE /intro/{id}: non existing', async () => {
    const result = await chai.request(url).delete(`/intro/${badId}`);

    expect(result.status).toEqual(404);
    expect(result.type).toEqual('application/json');
    expect(result.request.url).toEqual(`${url}/intro/${badId}`);
    expect(result.request.method).toEqual('delete');
    expect(result.body.data).toEqual(undefined);
  });
});
