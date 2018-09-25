import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import * as assert from './response.validation';
import { dropDatabase, username, password } from './helper';
import '../api/resources/admins/admins.model';
import '../api/resources/blog/blog.model';
import '../api/resources/event/event.model';
import '../api/resources/info/info.model';
import '../api/resources/intro/intro.model';
import '../api/resources/media/media.model';
import '../api/resources/service/service.model';

chai.use(chaiHttp);
dotenv.config();
const resources = ['register', 'admins', 'signin'];
const baseUrl = process.env.BACKEND_URL;
const jwt = [];
let tempPassword = '';
const ids = [];

describe('ADMIN', () => {
  beforeAll(async () => {
    await dropDatabase();
    mongoose.connection.close(() => {});
  });

  afterAll(async () => {
    await dropDatabase();
    mongoose.connection.close(() => {});
  });

  // should register super-admin
  describe('REGISTER: super-admin', () => {
    describe(`POST ${baseUrl}api/v1/${resources[0]}`, () => {
      test('201 - Created - super-admin', async () => {
        const result = await chai
          .request(baseUrl)
          .post(`/api/v1/${resources[0]}`)
          .send({ username: username.SUPER_ADMIN, password: password.STRONG });

        const { token } = result.body.data;
        jwt.push(token);

        assert.registerSuccess(result);
      });
    });
  });

  // super-admin register an admin
  describe('REGISTER: admin', () => {
    describe(`POST ${baseUrl}api/v1/${resources[1]}`, () => {
      test('201 - Created - admin', async () => {
        const result = await chai
          .request(baseUrl)
          .post(`/api/v1/${resources[1]}`)
          .set('Authorization', `Bearer ${jwt[0]}`)
          .send({ username: username.ADMIN });

        const { temporaryPassword } = result.body.data;
        tempPassword = temporaryPassword;

        assert.postSuccessTemporaryPassword(result);
      });
    });
  });

  // super admin gets all admins data
  describe(`GET: all`, () => {
    describe(`GET ${baseUrl}api/v1/${resources[1]}`, () => {
      test('200 - Ok', async () => {
        const result = await chai
          .request(baseUrl)
          .get(`/api/v1/${resources[1]}`)
          .set('Authorization', `Bearer ${jwt[0]}`);

        const { admins } = result.body.data;
        ids.push(admins[0]._id);
        ids.push(admins[1]._id);

        assert.getAdminSuccess(result);
      });
    });
  });

  // admin signin
  describe('SIGNIN: admin', () => {
    describe(`POST ${baseUrl}api/v1/${resources[2]}`, () => {
      test('POST', async () => {
        const result = await chai
          .request(baseUrl)
          .post(`/api/v1/${resources[2]}`)
          .send({ username: username.ADMIN, password: tempPassword });

        const { token } = result.body.data;
        jwt.push(token);

        assert.signinSuccess(result);
      });
    });
  });

  // admin gets only his own data. // TODO investigate
  describe('GET: admin', () => {
    describe(`GET ${baseUrl}api/v1/${resources[1]}/id`, () => {
      test('200: Ok - admin', async () => {
        const result = await chai
          .request(baseUrl)
          .get(`/api/v1/${resources[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt[1]}`);

        assert.getAdminSuccess(result, false);
      });

      test('200: Ok - admin', async () => {
        const result = await chai
          .request(baseUrl)
          .get(`/api/v1/${resources[1]}/${ids[1]}`)
          .set('Authorization', `Bearer ${jwt[1]}`);

        assert.getAdminSuccess(result, false);
      });
    });
  });

  // admin only updates his own password
  describe('PASSWORD CHANGE: admin', () => {
    describe(`PUT ${baseUrl}api/v1/${resources[1]}`, () => {
      test('202 - Accepted - admin (self)', async () => {
        const result = await chai
          .request(baseUrl)
          .put(`/api/v1/${resources[1]}/${ids[1]}`)
          .set('Authorization', `Bearer ${jwt[1]}`)
          .send({
            currentPassword: tempPassword,
            newPassword: password.NEW,
            newPasswordAgain: password.NEW,
          });

        assert.putSuccess(result);
      });

      test('401 - Unauthorized - admin: update others (super-admin or admin) password', async () => {
        const result = await chai
          .request(baseUrl)
          .put(`/api/v1/${resources[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt[1]}`)
          .send({});

        assert.unauthorized(result);
      });
    });
  });

  // admin delete only itself
  describe('DELETE: admin', () => {
    describe(`DELETE ${baseUrl}api/v1/${resources[1]}`, () => {
      test('202 - Accepted - self (admin)', async () => {
        const result = await chai
          .request(baseUrl)
          .delete(`/api/v1/${resources[1]}/${ids[1]}`)
          .set('Authorization', `Bearer ${jwt[1]}`);

        assert.deleteSuccess(result);
      });

      test('401 - Unauthorized - delete others (super-admin or admin)', async () => {
        const result = await chai
          .request(baseUrl)
          .delete(`/api/v1/${resources[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt[1]}`);

        assert.unauthorized(result);
      });
    });
  });

  // super-admin delete self
  describe('DELETE: super-admin', () => {
    describe(`DELETE ${baseUrl}api/v1/${resources[1]}`, () => {
      test('202 - Accepted - self (super-admin)', async () => {
        const result = await chai
          .request(baseUrl)
          .delete(`/api/v1/${resources[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt[0]}`);

        assert.deleteSuccess(result);
      });
    });
  });
});
