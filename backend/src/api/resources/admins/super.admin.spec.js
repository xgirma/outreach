import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../server';
import * as assert from '../../../../helpers/response.validation';
import { dropDatabase } from '../../__tests_/database';
import * as faker from '../../../../helpers/faker';
import * as assertAdmin from './test.helper';
import * as err from '../../modules/error'; // TODO remove after devlopment
import * as assert2 from '../../__tests_/crud.validator';
import * as co from '../../__tests_/constants';

chai.use(chaiHttp);
const resourceName = ['register', 'admins', 'signin'];
let jwt;
const ids = [];
const badRequest = (result) =>
  assert2.badRequest(result, 'proper username and password is required');

describe(`Route: ${resourceName.join(', ').toUpperCase()}`, () => {
  beforeAll(async () => {
    await dropDatabase();
  });

  afterAll(async () => {
    await dropDatabase();
  });

  /*
   * should not register a super-admin, if req.body is invalid
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
          .send(co.ADMIN_SHORT_PASSWORD);

        badRequest(result);
      });

      test('should not register if password length is > 128 characters', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[0]}`)
          .send(co.ADMIN_LONG_PASSWORD);

        badRequest(result);
      });

      test('should not register if password is weak', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[0]}`)
          .send(co.ADMIN_WEAK_PASSWORD);

        assert2.registerWithWeakPassword(result);
      });

      test('should not register if pass-phrase is weak', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[0]}`)
          .send(co.ADMIN_WEAK_PASS_PHRASE);

        assert2.registerWithWeakPassPhrase(result);
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
          .send(co.SUPER_ADMIN_LOGIN);

        const { token } = result.body.data;
        jwt = token; // the new super-admin token is saved here

        assert2.registerSuccess(result);
      });

      test('super-admin: should not register super-admin if exists', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[0]}`)
          .send(co.SUPER_ADMIN_LOGIN);

        assert2.forbidden(result, 'user already exists');
      });
    });
  });

  /*
   * should not register admin, if req.body is invalid
   * - {}
   * - invalid schema, e.g. { name: '' },
   * - password is < 8 characters
   * - password is > 128 characters
   * - weak password
   * - weak pass-phrase
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

      test('should not register if password length is < 8 characters', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[1]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(co.ADMIN_SHORT_PASSWORD);

        badRequest(result);
      });

      test('should not register if password length is > 128 characters', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[1]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(co.ADMIN_LONG_PASSWORD);

        badRequest(result);
      });

      test('should not register if password is weak', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[1]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(co.ADMIN_WEAK_PASSWORD);

        assert2.registerWithWeakPassword(result);
      });

      test('should not register if pass-phrase is weak', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[1]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(co.ADMIN_WEAK_PASS_PHRASE);

        assert2.registerWithWeakPassPhrase(result);
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
          .send(co.ADMIN_LOGIN);

        assert2.registerSuccess(result);
      });

      test('super-admin: should register the 2nd admin with good req-body', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[1]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(co.SECOND_ADMIN_LOGIN);

        assert2.registerSuccess(result);
      });

      test('super-admin: should not register if admin already exist', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[1]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(co.SECOND_ADMIN_LOGIN);

        assert2.forbidden(result, 'user already exists');
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

        assert2.getAdminSuccess(result);
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

        assert2.getAdminSuccess(result, false);
      });

      test('super-admin: should get the second admin by id', async () => {
        const result = await chai
          .request(app)
          .get(`/api/v1/${resourceName[1]}/${ids[1]}`)
          .set('Authorization', `Bearer ${jwt}`);

        assert2.getAdminSuccess(result, false);
      });

      test(`super-admin: should get the third admin by id ${ids[2]}`, async () => {
        const result = await chai
          .request(app)
          .get(`/api/v1/${resourceName[1]}/${ids[2]}`)
          .set('Authorization', `Bearer ${jwt}`);

        assert2.getAdminSuccess(result, false);
      });

      test('super-admin: should not get admin with bad mongoose id', async () => {
        const result = await chai
          .request(app)
          .get(`/api/v1/${resourceName[1]}/${co.BAD_MONGO_ID}`)
          .set('Authorization', `Bearer ${jwt}`);

        assert2.notFound(result, 'Not a MongoId');
      });

      test('super-admin: should not get admin with valid but non-existent mongoose id', async () => {
        const result = await chai
          .request(app)
          .get(`/api/v1/${resourceName[1]}/${co.MONGO_ID}`)
          .set('Authorization', `Bearer ${jwt}`);

        assert2.notFound(result, 'No resource found with this Id');
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

        assert2.badRequest(result, 'proper current and new password is required');
      });

      test('super-admin: should not update if req-body is invalid', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send({ name: '' });

        assert2.badRequest(result, 'proper current and new password is required');
      });

      test('super-admin: should not update if password length is < 8 characters', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(co.SUPER_ADMIN_UPDATE_WITH_NEW_SHORT_PASSWORD);

        assert2.badRequest(result, 'proper current and new password is required');
      });

      test('super-admin: should not update if password length is > 128 characters', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(co.SUPER_ADMIN_UPDATE_WITH_LONG_PASSWORD);

        assert2.badRequest(result, 'proper current and new password is required');
      });

      test('super-admin: should not update password if password is weak', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(co.SUPER_ADMIN_UPDATE_WITH_WEAK_PASSWORD);

        assert2.updateWithWeakPassword(result);
      });

      test('super-admin: should not update password if pass-phrase is weak', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(co.SUPER_ADMIN_UPDATE_WITH_WEAK_PASS_PHRASE);

        assert2.updateWithWeakPassPhrase(result);
      });

      test('super-admin: new password entries do not match', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(assertAdmin.newPasswordDoNotMatch);

        assert2.badRequest(result, 'new passwords do not match');
      });

      test('super-admin: new password is the same as current', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(assertAdmin.newPasswordSameWithCurrent);

        assert2.badRequest(result, 'new password is the same as current');
      });

      test('super-admin: wrong current password', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(assertAdmin.wrongCurrentPassword);

        assert2.forbidden(result, 'wrong current password');
      });

      test('super-admin: should update super-admin password', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(assertAdmin.withGoodPassword);

        assert2.putSuccess(result);
      });

      test('super-admin: should update admin password', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[1]}/${ids[1]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send({}); // no request body required

        const { status, data } = result.body;

        expect(result).to.have.status(201);
        expect(status).to.equal('success');
        expect(data.temporaryPassword).not.to.equal('');
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

        assert2.badRequest(result, 'proper username and password is required');
      });

      test('should not signin if req-body is invalid', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[2]}/${ids[0]}`)
          .send({ name: '' });

        assert2.badRequest(result, 'proper username and password is required');
      });

      test('should not signin with bad username', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[2]}/${ids[0]}`)
          .send(co.SIGNIN_BAD_USERNAME);

        assert2.badUsernameOrPassword(result);
      });

      test('should not signin with bad password', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[2]}/${ids[0]}`)
          .send(co.SIGNIN_BAD_PASSWORD);

        assert2.badUsernameOrPassword(result);
      });

      test('should not signin with bad username and password', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[2]}/${ids[0]}`)
          .send(co.SIGNIN_BAD_USERNAME_AND_PASSWORD);

        assert2.badUsernameOrPassword(result);
      });

      test('super-admin should be able to signin', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[2]}`)
          .send(assertAdmin.signInAfterUpdate);

        const { status, data } = result.body;
        const { token } = data;
        // jwt = token; // the new super-admin token is saved here

        expect(result).to.have.status(200);
        expect(status).to.equal('success');
        expect(token).not.to.equal('');
      });
    });
  });

  /*
   * super-admin delete admin by id
   *
   * Should fail
   * - non existing id
   */
  describe(`${resourceName[1].toUpperCase()}:`, () => {
    describe(`DELETE /${resourceName[1]}`, () => {
      test('should delete the first admin', async () => {
        const result = await chai
          .request(app)
          .delete(`/api/v1/${resourceName[1]}/${ids[1]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(assertAdmin.thirdAdminCredential);

        assert.success(result);
      });

      test('should delete the second admin', async () => {
        const result = await chai
          .request(app)
          .delete(`/api/v1/${resourceName[1]}/${ids[2]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(assertAdmin.thirdAdminCredential);

        assert.success(result);
      });

      test('should not delete if admin does not exist', async () => {
        const result = await chai
          .request(app)
          .delete(`/api/v1/${resourceName[1]}/${ids[2]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(assertAdmin.thirdAdminCredential);

        assert.notFound(result, 'No resource found with this Id');
      });

      test('should delete self (super-admin)', async () => {
        const result = await chai
          .request(app)
          .delete(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(assertAdmin.thirdAdminCredential);

        assert.success(result);
      });
    });
  });
});
