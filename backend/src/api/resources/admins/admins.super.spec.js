/* eslint-disable object-curly-newline */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../server';
import { dropDatabase } from '../../__tests_/database';
import * as assert from '../../__tests_/crud.validator';
import * as constants from '../../__tests_/constants';

chai.use(chaiHttp);
const resourceName = ['register', 'admins', 'signin'];
let jwt;
const ids = [];
const badRequest = (result) =>
  assert.badRequest(result, 'proper username and password is required');
const badUpdateRequest = (result) =>
  assert.badRequest(result, 'proper current and new password is required');
const { SHORT, WEAK, LONG, STRONG, NEW, WEAK_PASS_PHRASE } = constants.password;
const { SUPER_ADMIN, ADMIN, ADMIN_ASSISTANT } = constants.username;

describe(`Route: ${resourceName.join(', ').toUpperCase()}`, () => {
  beforeAll(async () => {
    await dropDatabase();
  });

  afterAll(async () => {
    await dropDatabase();
  });

  /*
   * should not register super-admin, if req.body contains
   * - {}
   * - invalid schema, e.g. { name: '' },
   * - password is < 8 characters
   * - password is > 128 characters
   * - weak password
   * - weak pass-phrase
   */
  describe(`${resourceName[0].toUpperCase()}: with bad request body`, () => {
    describe(`POST /${resourceName[0]}`, () => {
      test('should not register if req-body is {}', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[0]}`)
          .send({});

        badRequest(result);
      });

      test('should not register if req-body is invalid', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[0]}`)
          .send({ name: '' });

        badRequest(result);
      });

      test('should not register if password length is < 8 characters', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[0]}`)
          .send({ username: SUPER_ADMIN, password: SHORT });

        badRequest(result);
      });

      test('should not register if password length is > 128 characters', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[0]}`)
          .send({ username: SUPER_ADMIN, password: LONG });

        badRequest(result);
      });

      test('should not register if password is weak', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[0]}`)
          .send({ username: SUPER_ADMIN, password: WEAK });

        assert.weakPassword(result);
      });

      test('should not register if pass-phrase is weak', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[0]}`)
          .send({ username: SUPER_ADMIN, password: WEAK_PASS_PHRASE });

        assert.weakPassPhrase(result);
      });
    });
  });

  /*
   * should register super-admin
   * there should only be one super-admin
   * adding more super-admin should be prevented
   */
  describe(`${resourceName[0].toUpperCase()}: with good request body`, () => {
    describe(`POST /${resourceName[0]}`, () => {
      test('super-admin: should register super-admin', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[0]}`)
          .send({ username: SUPER_ADMIN, password: STRONG });

        const { token } = result.body.data;
        jwt = token; // the new super-admin token is saved here

        assert.registerSuccess(result);
      });

      test('super-admin: should not register super-admin if exists', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[0]}`)
          .send({ username: SUPER_ADMIN, password: STRONG });

        assert.forbidden(result, 'user already exists');
      });
    });
  });

  /*
   * should not register admin, if req.body is
   * - {}
   * - invalid schema, e.g. { name: '' }
   */
  describe(`${resourceName[1].toUpperCase()}: with bad request body`, () => {
    describe(`POST /${resourceName[1]}`, () => {
      test('should not register if req-body is {}', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[1]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send({});

        badRequest(result);
      });

      test('should not register if req-body is invalid', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[1]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send({ name: '' });

        badRequest(result);
      });
    });
  });

  /*
   * should register an admin, if req.body is valid
   * registering more-than one admin should be possible.
   * should not register admin if admin with the username already exists.
   */
  describe(`${resourceName[1].toUpperCase()}: with good request body`, () => {
    describe(`POST /${resourceName[1]}`, () => {
      test('super-admin: should register the 1st admin with good req-body', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[1]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send({ username: ADMIN });

        assert.postSuccessTemporaryPassword(result);
      });

      test('super-admin: should register the 2nd admin with good req-body', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[1]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send({ username: ADMIN_ASSISTANT });

        assert.postSuccessTemporaryPassword(result);
      });

      test('super-admin: should not register if admin already exist', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[1]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send({ username: ADMIN_ASSISTANT });

        assert.forbidden(result, 'user already exists');
      });
    });
  });

  /*
   * super admin gets ALL admins data, including itself.
   */
  describe(`${resourceName[1].toUpperCase()}: get all`, () => {
    describe(`GET /${resourceName[1]}`, () => {
      test('super-admin: should get all admins', async () => {
        const result = await chai
          .request(app)
          .get(`/api/v1/${resourceName[1]}`)
          .set('Authorization', `Bearer ${jwt}`);

        const { admins } = result.body.data;
        ids.push(admins[0]._id);
        ids.push(admins[1]._id);
        ids.push(admins[2]._id);

        assert.getAdminSuccess(result);
      });
    });
  });

  /*
   * super-admin gets admin by id
   * should not get admin with
   * - bad mongoID
   * - good but non exiting mongoID
   */
  describe(`${resourceName[1].toUpperCase()}: get one by id`, () => {
    describe(`GET /${resourceName[1]}/{id}`, () => {
      test('super-admin: should get the first super-admin by id', async () => {
        const result = await chai
          .request(app)
          .get(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`);

        assert.getAdminSuccess(result, false);
      });

      test('super-admin: should get the second admin by id', async () => {
        const result = await chai
          .request(app)
          .get(`/api/v1/${resourceName[1]}/${ids[1]}`)
          .set('Authorization', `Bearer ${jwt}`);

        assert.getAdminSuccess(result, false);
      });

      test(`super-admin: should get the third admin by id ${ids[2]}`, async () => {
        const result = await chai
          .request(app)
          .get(`/api/v1/${resourceName[1]}/${ids[2]}`)
          .set('Authorization', `Bearer ${jwt}`);

        assert.getAdminSuccess(result, false);
      });

      test('super-admin: should not get admin with bad mongoose id', async () => {
        const result = await chai
          .request(app)
          .get(`/api/v1/${resourceName[1]}/${constants.BAD_MONGO_ID}`)
          .set('Authorization', `Bearer ${jwt}`);

        assert.notFound(result, 'not a MongoId');
      });

      test('super-admin: should not get admin with valid but non-existent mongoose id', async () => {
        const result = await chai
          .request(app)
          .get(`/api/v1/${resourceName[1]}/${constants.MONGO_ID}`)
          .set('Authorization', `Bearer ${jwt}`);

        assert.notFound(result, 'no resource found with this Id');
      });
    });
  });

  /*
   * update password of
   * 1. super-admin
   * 2. admin
   *
   * Should fail if
   * - req.body is bad
   * - new password is < 8 characters
   * - new password is > 128 characters
   * - new password entries do not match
   * - new password is the same as current
   * - wrong current password
   */
  describe(`${resourceName[1].toUpperCase()}: password update`, () => {
    describe(`PUT /${resourceName[1]}`, () => {
      test('super-admin: should not update if req-body is {}', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send({});

        badUpdateRequest(result);
      });

      test('super-admin: should not update if req-body is invalid', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send({ name: '' });

        badUpdateRequest(result);
      });

      test('super-admin: should not update if password length is < 8 characters', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send({
            currentPassword: STRONG,
            newPassword: SHORT,
            newPasswordAgain: SHORT,
          });

        badUpdateRequest(result);
      });

      test('super-admin: should not update if password length is > 128 characters', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send({
            currentPassword: STRONG,
            newPassword: LONG,
            newPasswordAgain: LONG,
          });

        badUpdateRequest(result);
      });

      test('super-admin: should not update password if password is weak', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send({
            currentPassword: STRONG,
            newPassword: WEAK,
            newPasswordAgain: WEAK,
          });

        assert.weakPassword(result);
      });

      test('super-admin: should not update password if pass-phrase is weak', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send({
            currentPassword: STRONG,
            newPassword: WEAK_PASS_PHRASE,
            newPasswordAgain: WEAK_PASS_PHRASE,
          });

        assert.weakPassPhrase(result);
      });

      test('super-admin: new password entries do not match', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send({
            currentPassword: STRONG,
            newPassword: NEW,
            newPasswordAgain: 'q-W:QzA$3SS',
          });

        assert.badRequest(result, 'new passwords do not match');
      });

      test('super-admin: new password is the same as current', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send({
            currentPassword: STRONG,
            newPassword: STRONG,
            newPasswordAgain: STRONG,
          });

        assert.badRequest(result, 'new password is the same as current');
      });

      test('super-admin: wrong current password', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send({
            currentPassword: 'o-Y:SaM/4Wwww',
            newPassword: NEW,
            newPasswordAgain: NEW,
          });

        assert.forbidden(result, 'wrong current password');
      });

      test('super-admin: should update super-admin password', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send({
            currentPassword: STRONG,
            newPassword: NEW,
            newPasswordAgain: NEW,
          });

        assert.putSuccess(result);
      });

      test('super-admin: should update admin password', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[1]}/${ids[1]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send({}); // no request body required

        assert.putSuccessTemporaryPassword(result);
      });
    });
  });

  /*
   * signin
   *
   * should fail if
   * - bad req.body
   * - bad username and/or password
   */
  describe(`${resourceName[2].toUpperCase()}:`, () => {
    describe(`POST /${resourceName[2]}`, () => {
      test('should not signin if req-body is {}', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[2]}/${ids[0]}`)
          .send({});

        badRequest(result);
      });

      test('should not signin if req-body is invalid', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[2]}/${ids[0]}`)
          .send({ name: '' });

        badRequest(result);
      });

      test('should not signin with bad username', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[2]}/${ids[0]}`)
          .send({ username: 'bad.username', password: STRONG });

        assert.forbidden(result);
      });

      test('should not signin with bad password', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[2]}/${ids[0]}`)
          .send({ username: SUPER_ADMIN, password: 'bad.password' });

        assert.badUsernameOrPassword(result);
      });

      test('should not signin with bad username and password', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[2]}/${ids[0]}`)
          .send({ username: 'bad.password', password: 'bad.password' });

        assert.badUsernameOrPassword(result);
      });

      test('super-admin: should be able to signin', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[2]}`)
          .send({ username: SUPER_ADMIN, password: NEW });

        assert.signinSuccess(result);
      });
    });
  });

  /*
   * super-admin delete admin by id and self
   *
   * should fail
   * - non existing id
   */
  describe(`${resourceName[1].toUpperCase()}:`, () => {
    describe(`DELETE /${resourceName[1]}`, () => {
      test('super-admin: should delete the first admin', async () => {
        const result = await chai
          .request(app)
          .delete(`/api/v1/${resourceName[1]}/${ids[1]}`)
          .set('Authorization', `Bearer ${jwt}`);

        assert.deleteSuccess(result);
      });

      test('super-admin: should delete the second admin', async () => {
        const result = await chai
          .request(app)
          .delete(`/api/v1/${resourceName[1]}/${ids[2]}`)
          .set('Authorization', `Bearer ${jwt}`);

        assert.deleteSuccess(result);
      });

      test('super-admin: should not delete if admin does not exist', async () => {
        const result = await chai
          .request(app)
          .delete(`/api/v1/${resourceName[1]}/${ids[2]}`)
          .set('Authorization', `Bearer ${jwt}`);

        assert.notFound(result, 'no resource found with this Id');
      });

      test('super-admin: should delete self (super-admin)', async () => {
        const result = await chai
          .request(app)
          .delete(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`);

        assert.deleteSuccess(result);
      });
    });
  });
});
