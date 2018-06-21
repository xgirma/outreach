import chai from 'chai';
import chaiHttp from 'chai-http';
import { notFound } from '../helpers/http.status.assertion';

require('dotenv').config();

const url = `${process.env.HOST}:${process.env.PORT}/${process.env.BASE_PATH}`;

chai.use(chaiHttp);

describe('invalid routes', () => {
  test('GET invalid route', async () => {
    const result = await chai.request(url).get('/');

    notFound(result);
  });

  test('GET invalid route', async () => {
    const result = await chai.request(url).get('/api/v1/xysze');

    notFound(result);
  });
});
