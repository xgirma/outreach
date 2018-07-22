import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../server';
import * as assert from '../../__tests_/crud.validator';
import { dropDatabase } from '../../__tests_/database';
import * as co from '../../__tests_/constants';

chai.use(chaiHttp);
const resourceName = ['register', 'admins', 'signin'];
let jwt;
const ids = [];

describe(`Route: ${resourceName.join(', ').toUpperCase()}`, () => {
  beforeAll(async () => {
    await dropDatabase();
  });

  afterAll(async () => {
    await dropDatabase();
  });

  // Should register an super-admin
  describe(`${resourceName[0].toUpperCase()}: with good request body`, () => {
    describe(`POST /${resourceName[0]}`, () => {
      test('should register super-admin', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[0]}`)
          .send(co.SUPER_ADMIN_LOGIN);

        const { token } = result.body.data;
        jwt = token; // the new super-admin token is saved here

        assert.registerSuccess(result);
      });
    });
  });

  // Super-admin register an admin
  describe(`${resourceName[1].toUpperCase()}: with good request body`, () => {
    describe(`POST /${resourceName[1]}`, () => {
      test('super-admin: should register an admin', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[1]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(co.ADMIN_LOGIN);

        assert.postSuccess(result);
      });
    });
  });

  // Super admin gets all admins data
  describe(`${resourceName[1].toUpperCase()}: get all`, () => {
    describe(`GET /${resourceName[1]}`, () => {
      test('super-admin: should GET admins', async () => {
        const result = await chai
          .request(app)
          .get(`/api/v1/${resourceName[1]}`)
          .set('Authorization', `Bearer ${jwt}`);

        const { admins } = result.body.data;
        ids.push(admins[0]._id);
        ids.push(admins[1]._id);

        assert.getAdminSuccess(result);
      });
    });
  });

  // Admin signin
  describe(`${resourceName[2].toUpperCase()}:`, () => {
    describe(`POST /${resourceName[2]}`, () => {
      test('admin: admin should be able to signin', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[2]}`)
          .send(co.ADMIN_LOGIN);

        const { token } = result.body.data;
        jwt = token; // the new admin token is saved here

        assert.signinSuccess(result);
      });
    });
  });

  // Admin gets only his own data.
  describe(`${resourceName[1].toUpperCase()}: get self only`, () => {
    describe(`GET /${resourceName[1]}/${ids[1]}`, () => {
      test('admin: should GET itself', async () => {
        const result = await chai
          .request(app)
          .get(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`);

        assert.getAdminSuccess(result, false);
      });
    });
  });

  // Admin only updates his own password
  describe(`${resourceName[1].toUpperCase()}: password update`, () => {
    describe(`PUT /${resourceName[1]}`, () => {
      test('admin: should update its-own password', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[1]}/${ids[1]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(co.ADMIN_LOGIN_UPDATE);

        assert.putSuccess(result);
      });

      test('admin: should not update others (super-admin or admin) password', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send({});

        assert.unauthorized(result);
      });
    });
  });

  // Admin delete only itself
  describe(`${resourceName[1].toUpperCase()}:`, () => {
    describe(`DELETE /${resourceName[1]}`, () => {
      test('admin: should not delete others (super-admin or admin)', async () => {
        const result = await chai
          .request(app)
          .delete(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`);

        assert.unauthorized(result);
      });

      test('admin: should delete self (admin)', async () => {
        const result = await chai
          .request(app)
          .delete(`/api/v1/${resourceName[1]}/${ids[1]}`)
          .set('Authorization', `Bearer ${jwt}`);

        assert.deleteSuccess(result);
      });
    });
  });

  // Signin super-admin
  describe(`${resourceName[2].toUpperCase()}:`, () => {
    describe(`POST /${resourceName[2]}`, () => {
      test('super-admin: should be able to signin', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[2]}`)
          .send(co.SUPER_ADMIN_LOGIN);

        const { token } = result.body.data;
        jwt = token; // the new admin token is saved here

        assert.signinSuccess(result);
      });
    });
  });

  // Super-admin delete self
  describe(`${resourceName[1].toUpperCase()}:`, () => {
    describe(`DELETE /${resourceName[1]}`, () => {
      test('super-admin: should delete self', async () => {
        const result = await chai
          .request(app)
          .delete(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`);

        assert.deleteSuccess(result);
      });
    });
  });
});

// TODO try to create another admin
