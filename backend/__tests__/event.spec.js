import chai from 'chai';
import chaiHttp from 'chai-http';
import churchEvent from '../src/helpers/faker.event';
import { notFound, ok, created } from '../src/helpers/assertions';

require('dotenv').config();

const url = `${process.env.HOST}:${process.env.PORT}/${process.env.BASE_PATH}`;
const data = churchEvent();
const badId = 200220202;

chai.use(chaiHttp);

describe('event', () => {
  test('POST /event', async () => {
    const result = await chai
      .request(url)
      .post('/event')
      .send(data);

    created(result);
  });

  test('GET /event', async () => {
    const result = await chai.request(url).get('/event');

    ok(result);
  });

  test('GET /event/{id}', async () => {
    const result = await chai.request(url).get(`/event/${data._id}`);

    ok(result);
  });

  test('GET /event/{id}: non existing', async () => {
    const result = await chai.request(url).get(`/event/${badId}`);

    notFound(result);
  });

  test('PUT /event/{id}', async () => {
    const result = await chai
      .request(url)
      .put(`/event/${data._id}`)
      .send(churchEvent());

    created(result);
  });

  test('DELETE /event/{id}', async () => {
    const result = await chai.request(url).delete(`/event/${data._id}`);

    created(result);
  });

  test('DELETE /event/{id}: non existing', async () => {
    const result = await chai.request(url).delete(`/event/${badId}`);

    notFound(result);
  });
});
