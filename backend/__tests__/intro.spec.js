import chai from 'chai';
import chaiHttp from 'chai-http';
import churchIntro from '../src/helpers/faker.intro';
import { notFound, ok, created } from '../src/helpers/assertions';

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

    created(result);
  });

  test('GET /intro', async () => {
    const result = await chai.request(url).get('/intro');

    ok(result);
  });

  test('GET /intro/{id}', async () => {
    const result = await chai.request(url).get(`/intro/${data._id}`);

    ok(result);
  });

  test('GET /intro/{id}: non existing', async () => {
    const result = await chai.request(url).get(`/intro/${badId}`);

    notFound(result);
  });

  test('PUT /intro/{id}', async () => {
    const result = await chai
      .request(url)
      .put(`/intro/${data._id}`)
      .send(churchIntro());

    created(result);
  });

  test('DELETE /intro/{id}', async () => {
    const result = await chai.request(url).delete(`/intro/${data._id}`);

    created(result);
  });

  test('DELETE /intro/{id}: non existing', async () => {
    const result = await chai.request(url).delete(`/intro/${badId}`);

    notFound(result);
  });
});
