import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../server';
import * as assert from '../../__tests_/crud.validator';
import { dropDatabase } from '../../__tests_/database';
import * as co from '../../__tests_/constants';

chai.use(chaiHttp);
const resourceName = ['register', 'admins', 'signin'];
let jwt;
let password = '';
const ids = [];
const { STRONG, NEW } = co.password;
const { SUPER_ADMIN, ADMIN } = co.username;

describe(`Route: ${resourceName.join(', ').toUpperCase()}`, () => {
  beforeAll(async () => {
    await dropDatabase();
  });

  afterAll(async () => {
    await dropDatabase();
  });

  // should register super-admin
  describe(`${resourceName[0].toUpperCase()}: with good request body`, () => {
    describe(`POST /${resourceName[0]}`, () => {
      test('should register super-admin', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[0]}`)
          .send({ username: SUPER_ADMIN, password: STRONG });

        const { token } = result.body.data;
        jwt = token; // the new super-admin token is saved here

        assert.registerSuccess(result);
      });
    });
  });

  // super-admin register an admin
  describe(`${resourceName[1].toUpperCase()}: with good request body`, () => {
    describe(`POST /${resourceName[1]}`, () => {
      test('super-admin: should register an admin', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[1]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send({ username: ADMIN });

        const { temporaryPassword } = result.body.data;
        password = temporaryPassword;

        assert.postSuccessData(result);
      });
    });
  });

  // super admin gets all admins data
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

  // admin signin
  describe(`${resourceName[2].toUpperCase()}:`, () => {
    describe(`POST /${resourceName[2]}`, () => {
      test('admin: admin should be able to signin', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[2]}`)
          .send({ username: ADMIN, password });

        const { token } = result.body.data;
        jwt = token; // the new admin token is saved here

        assert.signinSuccess(result);
      });
    });
  });

  // admin gets only his own data.
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

  // admin only updates his own password
  describe(`${resourceName[1].toUpperCase()}: password update`, () => {
    describe(`PUT /${resourceName[1]}`, () => {
      test('admin: should update its-own password', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[1]}/${ids[1]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send({
            currentPassword: password,
            newPassword: NEW,
            newPasswordAgain: NEW,
          });

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

  // admin delete only itself
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

  // signin super-admin
  describe(`${resourceName[2].toUpperCase()}:`, () => {
    describe(`POST /${resourceName[2]}`, () => {
      test('super-admin: should be able to signin', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[2]}`)
          .send({ username: SUPER_ADMIN, password: STRONG });

        const { token } = result.body.data;
        jwt = token; // the new admin token is saved here

        assert.signinSuccess(result);
      });
    });
  });

  // super-admin delete self
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
