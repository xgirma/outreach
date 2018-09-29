import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { dropDatabase, username, password, badMongoId, mongoId } from '../helper';
import * as assert from '../response.validation';
import '../../api/resources/admins/admins.model';
import '../../api/resources/blog/blog.model';
import '../../api/resources/event/event.model';
import '../../api/resources/info/info.model';
import '../../api/resources/intro/intro.model';
import '../../api/resources/media/media.model';
import '../../api/resources/service/service.model';

chai.use(chaiHttp);
dotenv.config();
const resources = ['register', 'admins', 'signin'];
const baseUrl = process.env.BACKEND_URL;
let jwt;
const ids = [];

describe(`${resources.join(', ').toUpperCase()}`, () => {
  beforeAll(async () => {
    await dropDatabase();
    mongoose.connection.close(() => {});
  });

  afterAll(async () => {
    await dropDatabase();
    mongoose.connection.close(() => {});
  });

  describe('SUPPER ADMIN', () => {
    /*
     * should not register super-admin, if req.body contains
     * - {}
     * - invalid schema, e.g. { name: '' },
     * - password is < 8 characters
     * - password is > 128 characters
     * - weak password
     * - weak pass-phrase
     */
    describe('REGISTER: bad', () => {
      describe(`POST ${baseUrl}/api/v1/${resources[0]}`, () => {
        test('400 - Error: Bad Request - {}', async () => {
          const result = await chai
            .request(baseUrl)
            .post(`/api/v1/${resources[0]}`)
            .send({});

          assert.badRequest(result, 'proper username and password is required');
        });

        test("400 - Error: Bad Request - { name: '' }", async () => {
          const result = await chai
            .request(baseUrl)
            .post(`/api/v1/${resources[0]}`)
            .send({ name: '' });

          assert.badRequest(result, 'proper username and password is required');
        });

        test('400 - Error: Bad Request - password < 8 characters', async () => {
          const result = await chai
            .request(baseUrl)
            .post(`/api/v1/${resources[0]}`)
            .send({ username: username.SUPER_ADMIN, password: password.SHORT });

          assert.badRequest(result, 'proper username and password is required');
        });

        test('400 - Error: Bad Request - password > 128 characters', async () => {
          const result = await chai
            .request(baseUrl)
            .post(`/api/v1/${resources[0]}`)
            .send({ username: username.SUPER_ADMIN, password: password.LONG });

          assert.badRequest(result, 'proper username and password is required');
        });

        test('400 - Error: Bad Request - weak password by OWASP', async () => {
          const result = await chai
            .request(baseUrl)
            .post(`/api/v1/${resources[0]}`)
            .send({ username: username.SUPER_ADMIN, password: password.WEAK });

          assert.weakPassword(result);
        });

        test('400 - Error: Bad Request - weak pass-phrase by OWASP', async () => {
          const result = await chai
            .request(baseUrl)
            .post(`/api/v1/${resources[0]}`)
            .send({ username: username.SUPER_ADMIN, password: password.WEAK_PASS_PHRASE });

          assert.weakPassPhrase(result);
        });
      });
    });

    /*
     * should register super-admin
     * there should only be one super-admin
     * adding more super-admin should be prevented
     */
    describe(`REGISTER: happy`, () => {
      describe(`POST ${baseUrl}/api/v1/${resources[0]}`, () => {
        test('201 - Created - super-admin', async () => {
          const result = await chai
            .request(baseUrl)
            .post(`/api/v1/${resources[0]}`)
            .send({ username: username.SUPER_ADMIN, password: password.STRONG });

          const { token } = result.body.data;
          jwt = token;

          assert.registerSuccess(result);
        });

        test('403 - Error: Forbidden - super-admin already exists', async () => {
          const result = await chai
            .request(baseUrl)
            .post(`/api/v1/${resources[0]}`)
            .send({ username: username.SUPER_ADMIN, password: password.STRONG });

          assert.forbidden(result, 'user already exists');
        });
      });
    });

    /*
     * should not register admin, if req.body is
     * - {}
     * - invalid schema, e.g. { name: '' }
     */
    describe('REGISTER: bad', () => {
      describe(`POST ${baseUrl}/api/v1/${resources[1]}`, () => {
        test('400 - Error: Bad Request - {}', async () => {
          const result = await chai
            .request(baseUrl)
            .post(`/api/v1/${resources[1]}`)
            .set('Authorization', `Bearer ${jwt}`)
            .send({});

          assert.badRequest(result, 'proper username and password is required');
        });

        test("400 - Error: Bad Request - { name: '' }", async () => {
          const result = await chai
            .request(baseUrl)
            .post(`/api/v1/${resources[1]}`)
            .set('Authorization', `Bearer ${jwt}`)
            .send({ name: '' });

          assert.badRequest(result, 'proper username and password is required');
        });
      });
    });

    /*
     * should register an admin, if req.body is valid
     * registering more-than one admin should be possible.
     * should not register admin if admin with the username already exists.
     */
    describe('REGISTER: happy', () => {
      describe(`POST ${baseUrl}/api/v1/${resources[1]}`, () => {
        test('201 - Created - register the 1st admin', async () => {
          const result = await chai
            .request(baseUrl)
            .post(`/api/v1/${resources[1]}`)
            .set('Authorization', `Bearer ${jwt}`)
            .send({ username: username.ADMIN });

          assert.postSuccessTemporaryPassword(result);
        });

        test('201 - Created - register the 2nd admin', async () => {
          const result = await chai
            .request(baseUrl)
            .post(`/api/v1/${resources[1]}`)
            .set('Authorization', `Bearer ${jwt}`)
            .send({ username: username.ADMIN_ASSISTANT });

          assert.postSuccessTemporaryPassword(result);
        });

        test('403 - Error: Forbidden - admin already exists', async () => {
          const result = await chai
            .request(baseUrl)
            .post(`/api/v1/${resources[1]}`)
            .set('Authorization', `Bearer ${jwt}`)
            .send({ username: username.ADMIN_ASSISTANT });

          assert.forbidden(result, 'user already exists');
        });
      });
    });

    /*
     * super admin gets ALL admins data, including self.
     */
    describe('GET all', () => {
      describe(`GET ${baseUrl}/api/v1/${resources[1]}`, () => {
        test('200 - Ok', async () => {
          const result = await chai
            .request(baseUrl)
            .get(`/api/v1/${resources[1]}`)
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
    describe('GET by id', () => {
      describe(`GET ${baseUrl}/api/v1/${resources[1]}/id`, () => {
        test('200 - Ok super-admin by id', async () => {
          const result = await chai
            .request(baseUrl)
            .get(`/api/v1/${resources[1]}/${ids[0]}`)
            .set('Authorization', `Bearer ${jwt}`);

          assert.getAdminSuccess(result, false);
        });

        test('200 - Ok first-admin by id', async () => {
          const result = await chai
            .request(baseUrl)
            .get(`/api/v1/${resources[1]}/${ids[1]}`)
            .set('Authorization', `Bearer ${jwt}`);

          assert.getAdminSuccess(result, false);
        });

        test('200 - Ok second-admin by id', async () => {
          const result = await chai
            .request(baseUrl)
            .get(`/api/v1/${resources[1]}/${ids[2]}`)
            .set('Authorization', `Bearer ${jwt}`);

          assert.getAdminSuccess(result, false);
        });

        test('404: Error: NotFound - not MongoId', async () => {
          const result = await chai
            .request(baseUrl)
            .get(`/api/v1/${resources[1]}/${badMongoId}`)
            .set('Authorization', `Bearer ${jwt}`);

          assert.notFound(result, 'not a MongoId');
        });

        test('404: Error: NotFound - valid but non-existent MongoId', async () => {
          const result = await chai
            .request(baseUrl)
            .get(`/api/v1/${resources[1]}/${mongoId}`)
            .set('Authorization', `Bearer ${jwt}`);

          assert.notFound(result, 'no resource found with this ID');
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
    describe('PASSWORD CHANGE', () => {
      describe(`PUT ${baseUrl}/api/v1//${resources[1]}/id`, () => {
        test('400 - BadRequest - {}', async () => {
          const result = await chai
            .request(baseUrl)
            .put(`/api/v1/${resources[1]}/${ids[0]}`)
            .set('Authorization', `Bearer ${jwt}`)
            .send({});

          assert.badRequest(result, 'proper current and new password is required');
        });

        test("400 - BadRequest - { name: '' }", async () => {
          const result = await chai
            .request(baseUrl)
            .put(`/api/v1/${resources[1]}/${ids[0]}`)
            .set('Authorization', `Bearer ${jwt}`)
            .send({ name: '' });

          assert.badRequest(result, 'proper current and new password is required');
        });

        test('400 - BadRequest - password length is < 8 characters', async () => {
          const result = await chai
            .request(baseUrl)
            .put(`/api/v1/${resources[1]}/${ids[0]}`)
            .set('Authorization', `Bearer ${jwt}`)
            .send({
              currentPassword: password.STRONG,
              newPassword: password.SHORT,
              newPasswordAgain: password.SHORT,
            });

          assert.badRequest(result, 'proper current and new password is required');
        });

        test('400 - BadRequest - password length is < 128 characters', async () => {
          const result = await chai
            .request(baseUrl)
            .put(`/api/v1/${resources[1]}/${ids[0]}`)
            .set('Authorization', `Bearer ${jwt}`)
            .send({
              currentPassword: password.STRONG,
              newPassword: password.LONG,
              newPasswordAgain: password.LONG,
            });

          assert.badRequest(result, 'proper current and new password is required');
        });

        test('400 - BadRequest - password is weak', async () => {
          const result = await chai
            .request(baseUrl)
            .put(`/api/v1/${resources[1]}/${ids[0]}`)
            .set('Authorization', `Bearer ${jwt}`)
            .send({
              currentPassword: password.STRONG,
              newPassword: password.WEAK,
              newPasswordAgain: password.WEAK,
            });

          assert.weakPassword(result);
        });

        test('400 - BadRequest - pass-phrase is weak', async () => {
          const result = await chai
            .request(baseUrl)
            .put(`/api/v1/${resources[1]}/${ids[0]}`)
            .set('Authorization', `Bearer ${jwt}`)
            .send({
              currentPassword: password.STRONG,
              newPassword: password.WEAK_PASS_PHRASE,
              newPasswordAgain: password.WEAK_PASS_PHRASE,
            });

          assert.weakPassPhrase(result);
        });

        test('400 - BadRequest - password entries do not match', async () => {
          const result = await chai
            .request(baseUrl)
            .put(`/api/v1/${resources[1]}/${ids[0]}`)
            .set('Authorization', `Bearer ${jwt}`)
            .send({
              currentPassword: password.STRONG,
              newPassword: password.NEW,
              newPasswordAgain: 'q-W:QzA$3SS',
            });

          assert.badRequest(result, 'new passwords do not match');
        });

        test('400 - BadRequest - new password is the same as current', async () => {
          const result = await chai
            .request(baseUrl)
            .put(`/api/v1/${resources[1]}/${ids[0]}`)
            .set('Authorization', `Bearer ${jwt}`)
            .send({
              currentPassword: password.STRONG,
              newPassword: password.STRONG,
              newPasswordAgain: password.STRONG,
            });

          assert.badRequest(result, 'new password is the same as current');
        });

        test('400 - BadRequest - wrong current password', async () => {
          const result = await chai
            .request(baseUrl)
            .put(`/api/v1/${resources[1]}/${ids[0]}`)
            .set('Authorization', `Bearer ${jwt}`)
            .send({
              currentPassword: 'o-Y:SaM/4Wwww',
              newPassword: password.NEW,
              newPasswordAgain: password.NEW,
            });

          assert.forbidden(result, 'wrong current password');
        });

        test('202 - Accepted - super-admin', async () => {
          const result = await chai
            .request(baseUrl)
            .put(`/api/v1/${resources[1]}/${ids[0]}`)
            .set('Authorization', `Bearer ${jwt}`)
            .send({
              currentPassword: password.STRONG,
              newPassword: password.NEW,
              newPasswordAgain: password.NEW,
            });

          assert.putSuccess(result);
        });

        test('202 - Accepted - admin 1', async () => {
          const result = await chai
            .request(baseUrl)
            .put(`/api/v1/${resources[1]}/${ids[1]}`)
            .set('Authorization', `Bearer ${jwt}`)
            .send({});

          assert.postSuccessTemporaryPassword(result);
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
    describe('SIGNIN', () => {
      describe(`POST ${baseUrl}/api/v1/${resources[2]}`, () => {
        test('400 - Error: BadRequest - {}', async () => {
          const result = await chai
            .request(baseUrl)
            .put(`/api/v1/${resources[2]}/${ids[0]}`)
            .send({});

          assert.badRequest(result, 'proper username and password is required');
        });

        test("400 - Error: BadRequest - { name: '' }", async () => {
          const result = await chai
            .request(baseUrl)
            .put(`/api/v1/${resources[2]}/${ids[0]}`)
            .send({ name: '' });

          assert.badRequest(result, 'proper username and password is required');
        });

        test('403 - Error: Forbidden - bad username', async () => {
          const result = await chai
            .request(baseUrl)
            .put(`/api/v1/${resources[2]}/${ids[0]}`)
            .send({ username: 'bad.username', password: password.STRONG });

          assert.forbidden(result);
        });

        test('403 - Error: Forbidden - bad password', async () => {
          const result = await chai
            .request(baseUrl)
            .put(`/api/v1/${resources[2]}/${ids[0]}`)
            .send({ username: username.SUPER_ADMIN, password: 'bad.password' });

          assert.forbidden(result);
        });

        test('403 - Error: Forbidden - bad username and password', async () => {
          const result = await chai
            .request(baseUrl)
            .put(`/api/v1/${resources[2]}/${ids[0]}`)
            .send({ username: 'bad.username', password: 'bad.password' });

          assert.forbidden(result);
        });

        test('200 - Ok - super-admin signin', async () => {
          const result = await chai
            .request(baseUrl)
            .post(`/api/v1/${resources[2]}`)
            .send({ username: username.SUPER_ADMIN, password: password.NEW });

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
    describe(`${resources[1].toUpperCase()}:`, () => {
      describe(`DELETE /${resources[1]}`, () => {
        test('202 - Accepted - delete first admin', async () => {
          const result = await chai
            .request(baseUrl)
            .delete(`/api/v1/${resources[1]}/${ids[1]}`)
            .set('Authorization', `Bearer ${jwt}`);

          assert.deleteSuccess(result);
        });

        test('202 - Accepted - delete second admin', async () => {
          const result = await chai
            .request(baseUrl)
            .delete(`/api/v1/${resources[1]}/${ids[2]}`)
            .set('Authorization', `Bearer ${jwt}`);

          assert.deleteSuccess(result);
        });

        test('404 - Error: NotFound - not delete if ID does not exist', async () => {
          const result = await chai
            .request(baseUrl)
            .delete(`/api/v1/${resources[1]}/${ids[2]}`)
            .set('Authorization', `Bearer ${jwt}`);

          assert.notFound(result, 'no resource found with this ID');
        });

        test('202 - Accepted - delete self (super-admin)', async () => {
          const result = await chai
            .request(baseUrl)
            .delete(`/api/v1/${resources[1]}/${ids[0]}`)
            .set('Authorization', `Bearer ${jwt}`);

          assert.deleteSuccess(result);
        });
      });
    });
  });
});
