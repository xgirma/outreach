import chai from 'chai';
import chaiHttp from 'chai-http';
import churchInfo from '../../src/helpers/generate';

chai.use(chaiHttp);

describe('PUT /info/{id}', () => {
  test('should update', async () => {
    const result = await chai.request('http://localhost:3005/api/v1')
      .put('/info/2')
      .send(churchInfo());
    
    expect(result.status).toEqual(202);
    expect(result.type).toEqual('application/json');
    expect(result.charset).toEqual('utf-8');
    expect(result.request.url).toEqual('http://localhost:3005/api/v1/info/2');
    expect(result.request.method).toEqual('put');
    expect(result.body.message).toEqual('Church information updated.');
    expect(result.body.data).not.toEqual({});
  });
});