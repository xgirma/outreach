import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../server';
import { dropDb } from '../../../../helpers/dropDb';
import * as intro from './test.helper';
import * as helpers from './../test.helper';

chai.use(chaiHttp);
const resourceName = ['register', 'intro'];
let jwt;
const ids = [];
const { en } = intro;

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
        .send(intro.supperAdminCredential);

      const { status, data } = result.body;
      const { token } = data;
      jwt = token; // super-admin token saved

      expect(result).to.have.status(201);
      expect(status).to.equal('success');
      expect(token).not.to.equal('');
    });
  });

  describe(`POST /${resourceName[1]}`, () => {
    test('should POST intro', async () => {
      const result = await chai
        .request(app)
        .post(`/api/v1/${resourceName[1]}`)
        .set('Authorization', `Bearer ${jwt}`)
        .send(intro.churchIntro);

      helpers.postSuccess(result);
    });
  });

  describe(`GET /${resourceName[1]}`, () => {
    test('should GET intro', async () => {
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
    test('should GET intro', async () => {
      const result = await chai
        .request(app)
        .get(`/api/v1/${resourceName[1]}/${ids[0]}`)
        .set('Authorization', `Bearer ${jwt}`);

      helpers.getSuccess(result);
    });
  });

  describe(`PUT /${resourceName[1]}/{id}`, () => {
    test('should update intro', async () => {
      const result = await chai
        .request(app)
        .put(`/api/v1/${resourceName[1]}/${ids[0]}`)
        .set('Authorization', `Bearer ${jwt}`)
        .send({ ...intro.churchIntro, en });

      helpers.putSuccess(result);
    });
  });

  describe(`GET /${resourceName[1]}/{id}`, () => {
    test('should GET intro', async () => {
      const result = await chai
        .request(app)
        .get(`/api/v1/${resourceName[1]}/${ids[0]}`)
        .set('Authorization', `Bearer ${jwt}`);

      const { status, data } = result.body;

      expect(result).to.have.status(200);
      expect(status).to.equal('success');
      expect(data.en).to.deep.equal(en);
    });
  });

  describe(`DELETE /${resourceName[1]}/{id}}`, () => {
    test('should delete intro', async () => {
      const result = await chai
        .request(app)
        .delete(`/api/v1/${resourceName[1]}/${ids[0]}`)
        .set('Authorization', `Bearer ${jwt}`);

      helpers.deleteSuccess(result);
    });
  });
});
