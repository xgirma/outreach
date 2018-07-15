import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../server';
import { dropDb } from '../../../../helpers/dropDb';
import * as info from './test.helper';
import * as helpers from './../test.helper';

chai.use(chaiHttp);
const resourceName = ['register', 'info'];
let jwt;
const ids = [];
const phone = '(425) 329 - 9000';

describe(`Route: ${resourceName.join(', ').toUpperCase()}`, () => {
  beforeAll(async () => {
    await dropDb();
  });

  afterAll(async () => {
    await dropDb();
  });

  /*
   * Test setup: create super-admin and get jwt token
   */
  describe(`POST /${resourceName[0]}`, () => {
    test('should register super-admin', async () => {
      const result = await chai
        .request(app)
        .post(`/api/v1/${resourceName[0]}`)
        .send(info.supperAdminCredential);

      const { status, data } = result.body;
      const { token } = data;
      jwt = token; // super-admin token saved

      expect(result).to.have.status(201);
      expect(status).to.equal('success');
      expect(token).not.to.equal('');
    });
  });

  describe(`POST /${resourceName[1]}`, () => {
    test('should POST info', async () => {
      const result = await chai
        .request(app)
        .post(`/api/v1/${resourceName[1]}`)
        .set('Authorization', `Bearer ${jwt}`)
        .send(info.churchInfo);

      const { status, data } = result.body;
      expect(result).to.have.status(201);
      expect(status).to.equal('success');
      expect(data).to.deep.equal({});
    });
  });

  describe(`GET /${resourceName[1]}`, () => {
    test('should GET info', async () => {
      const result = await chai
        .request(app)
        .get(`/api/v1/${resourceName[1]}`)
        .set('Authorization', `Bearer ${jwt}`);

      const { data } = result.body;
      data.map((d) => ids.push(d._id)); // ids saved

      helpers.getSuccess(result);
    });
  });

  describe(`GET /${resourceName[1]}/{id}`, () => {
    test('should GET info', async () => {
      const result = await chai
        .request(app)
        .get(`/api/v1/${resourceName[1]}/${ids[0]}`)
        .set('Authorization', `Bearer ${jwt}`);

      helpers.getSuccess(result);
    });
  });

  describe(`PUT /${resourceName[1]}/{id}`, () => {
    test('should update info', async () => {
      const result = await chai
        .request(app)
        .put(`/api/v1/${resourceName[1]}/${ids[0]}`)
        .set('Authorization', `Bearer ${jwt}`)
        .send({ ...info.churchInfo, phone });

      helpers.putSuccess(result);
    });
  });

  describe(`GET /${resourceName[1]}/{id}`, () => {
    test('should GET info', async () => {
      const result = await chai
        .request(app)
        .get(`/api/v1/${resourceName[1]}/${ids[0]}`)
        .set('Authorization', `Bearer ${jwt}`);

      const { status, data } = result.body;

      expect(result).to.have.status(200);
      expect(status).to.equal('success');
      expect(data.phone).to.deep.equal(phone);
    });
  });

  describe(`DELETE /${resourceName[1]}/{id}}`, () => {
    test('should delete info', async () => {
      const result = await chai
        .request(app)
        .delete(`/api/v1/${resourceName[1]}/${ids[0]}`)
        .set('Authorization', `Bearer ${jwt}`);

      helpers.deleteSuccess(result);
    });
  });
});
