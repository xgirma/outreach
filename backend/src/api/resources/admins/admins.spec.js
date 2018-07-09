import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../server';
import * as assert from '../../../../helpers/response.validation';
import { dropDb } from '../../../../helpers/dropDb';
import * as assertAdmin from './test.helper';

chai.use(chaiHttp);
const resourceName = ['register', 'admins', 'signin'];
let jwt;
const ids = [];

describe(`Route: ${resourceName.join(', ').toUpperCase()}`, () => {
  beforeAll(async () => {
    await dropDb();
  });

  afterAll(async () => {
    await dropDb();
  });

  /* TEST SETUP BEGIN */
  
  /*
   * Test case: Should register an super-admin
   */
  describe(`${resourceName[0].toUpperCase()}: with good request body`, () => {
    describe(`POST /${resourceName[0]}`, () => {
      test('should register super-admin', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[0]}`)
          .send(assertAdmin.supperAdminCredential);

        const { status, data } = result.body;
        const { token } = data;
        jwt = token; // the new super-admin token is saved here

        expect(result).to.have.status(201);
        expect(status).to.equal('success');
        expect(token).not.to.equal('');
      });
    });
  });

  /*
   * Test case: Should register an admin
   */
  describe(`${resourceName[1].toUpperCase()}: with good request body`, () => {
    describe(`POST /${resourceName[1]}`, () => {
      test('should register the 1st admin with good req-body', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[1]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(assertAdmin.secondAdminCredential);

        assert.success(result);
      });
    });
  });

  /*
   * Test case: Super admin gets all admins data
   */
  describe(`${resourceName[1].toUpperCase()}: get all`, () => {
    describe(`GET /${resourceName[1]}`, () => {
      test('should get all admins', async () => {
        const result = await chai
          .request(app)
          .get(`/api/v1/${resourceName[1]}`)
          .set('Authorization', `Bearer ${jwt}`);

        const { admins } = result.body.data;
        ids.push(admins[0]._id);
        ids.push(admins[1]._id);

        assertAdmin.getAdmin(result);
      });
    });
  });
  
  /* TEST SETUP END */

  /*
   * Test case: signin admin
   */
  describe(`${resourceName[2].toUpperCase()}:`, () => {
    describe(`POST /${resourceName[2]}`, () => {
      test('admin should be able to signin', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[2]}`)
          .send(assertAdmin.secondAdminCredential);

        const { status, data } = result.body;
        const { token } = data;
        jwt = token; // the new admin token is saved here

        expect(result).to.have.status(200);
        expect(status).to.equal('success');
        expect(token).not.to.equal('');
      });
    });
  });

  /*
   * Test case: Admin gets only his own data.
   */
  describe(`${resourceName[1].toUpperCase()}: get self only`, () => {
    describe(`GET /${resourceName[1]}/${ids[1]}`, () => {
      test('should get only its own admin data', async () => {
        const result = await chai
          .request(app)
          .get(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`);

        assertAdmin.getAdmin(result, false);
      });
    });
  });

  /*
   * Test case: admin only updates his own password
   */
  describe(`${resourceName[1].toUpperCase()}: password update`, () => {
    describe(`PUT /${resourceName[1]}`, () => {
      test('should update super-admin password', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[1]}/${ids[1]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(assertAdmin.withGoodPasswordAdmin);

        assert.success(result);
      });

      test('should update admin password', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(assertAdmin.withGoodPassword);

        assert.invalidToken(result);
      });
    });
  });

  /*
   * Test-case: admin delete only itself
   */
  describe(`${resourceName[1].toUpperCase()}:`, () => {
    describe(`DELETE /${resourceName[1]}`, () => {
      test('should not delete other admin', async () => {
        const result = await chai
          .request(app)
          .delete(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`);

        assert.invalidToken(result);
      });

      test('should delete self (admin)', async () => {
        const result = await chai
          .request(app)
          .delete(`/api/v1/${resourceName[1]}/${ids[1]}`)
          .set('Authorization', `Bearer ${jwt}`);

        assert.success(result);
      });
    });
  });

  /* TEST TEAR_DOWN BEGINS */
  
  /*
   * Test case: signin super-admin
   */
  describe(`${resourceName[2].toUpperCase()}:`, () => {
    describe(`POST /${resourceName[2]}`, () => {
      test('super-admin should be able to signin', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[2]}`)
          .send(assertAdmin.supperAdminCredential);

        const { status, data } = result.body;
        const { token } = data;
        jwt = token; // the new admin token is saved here

        expect(result).to.have.status(200);
        expect(status).to.equal('success');
        expect(token).not.to.equal('');
      });
    });
  });

  /*
   * Super-admin delete self
   */
  describe(`${resourceName[1].toUpperCase()}:`, () => {
    describe(`DELETE /${resourceName[1]}`, () => {
      test('should delete self (super-admin)', async () => {
        const result = await chai
          .request(app)
          .delete(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`);

        assert.success(result);
      });
    });
  });
  
  /* TEST TEAR_DOWN ENDS */
});
