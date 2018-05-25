import chai from 'chai';
import chaiHttp from 'chai-http';

require('dotenv').config();

const url = `${process.env.HOST}:${process.env.PORT}/${process.env.BASE_PATH}`;

chai.use(chaiHttp);

describe('invalid routes', () => {
  test('GET invalid route', async () => {
    const result = await chai.request(url).get('/');

    expect(result.status).toEqual(404);
    expect(result.type).toEqual('application/json');
    expect(result.request.url).toEqual(`${url}/`);
    expect(result.request.method).toEqual('get');
    expect(result.body.data).toEqual(undefined);
  });

  test('GET invalid route', async () => {
    const result = await chai.request(url).get('/api/v1/girma');

    expect(result.status).toEqual(404);
    expect(result.type).toEqual('application/json');
    expect(result.request.url).toEqual(`${url}/api/v1/girma`);
    expect(result.request.method).toEqual('get');
    expect(result.body.data).toEqual(undefined);
  });
});
