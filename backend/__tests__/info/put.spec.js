import chai from 'chai';
import chaiHttp from 'chai-http';
import churchInfo from '../../src/helpers/generate';

require('dotenv').config();

const url = `${process.env.HOST}:${process.env.PORT}/${process.env.BASE_PATH}`;
chai.use(chaiHttp);

describe('PUT /info/{id}', () => {
  test('should update', async () => {
    const result = await chai
      .request(url)
      .put('/info/2')
      .send(churchInfo());

    expect(result.status).toEqual(202);
    expect(result.type).toEqual('application/json');
    expect(result.charset).toEqual('utf-8');
    expect(result.request.url).toEqual(`${url}/info/2`);
    expect(result.request.method).toEqual('put');
    expect(result.body.message).toEqual('Church information updated.');
    expect(result.body.data).not.toEqual({});
  });

  test('should not update with IDs other than 1 or 2', async () => {
    const result = await chai
      .request(url)
      .put('/info/0')
      .send(churchInfo());

    expect(result.status).toEqual(400);
    expect(result.type).toEqual('application/json');
    expect(result.charset).toEqual('utf-8');
    expect(result.request.url).toEqual(`${url}/info/0`);
    expect(result.request.method).toEqual('put');
    expect(result.clientError).toEqual(true);
    expect(result.error.text).toMatch('ID should be either 1 or 2. Provided 0');
  });
});
