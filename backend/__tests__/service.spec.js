import chai from 'chai';
import chaiHttp from 'chai-http';
import churchService from '../src/helpers/faker.service';
import { notFound, ok, created } from '../src/helpers/assertions';

require('dotenv').config();

const url = `${process.env.HOST}:${process.env.PORT}/${process.env.BASE_PATH}`;
const data = churchService();
const badId = 200220202;

chai.use(chaiHttp);

describe('service', () => {
  test('POST /service', async () => {
    const result = await chai
      .request(url)
      .post('/service')
      .send(data);
    
    created(result);
  });
  
  test('GET /service', async () => {
    const result = await chai.request(url).get('/service');
    
    ok(result);
  });
  
  test('GET /service/{id}', async () => {
    const result = await chai.request(url).get(`/service/${data._id}`);
    
    ok(result);
  });
  
  test('GET /service/{id}: non existing', async () => {
    const result = await chai.request(url).get(`/service/${badId}`);
    
    notFound(result);
  });
  
  test('PUT /service/{id}', async () => {
    const result = await chai
      .request(url)
      .put(`/service/${data._id}`)
      .send(churchService());
    
    created(result);
  });
  
  test('DELETE /service/{id}', async () => {
    const result = await chai.request(url).delete(`/service/${data._id}`);
    
    created(result);
  });
  
  test('DELETE /service/{id}: non existing', async () => {
    const result = await chai.request(url).delete(`/service/${badId}`);
    
    notFound(result);
  });
});
