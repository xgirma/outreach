import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../server';
import * as assert from '../../../../helpers/response.validation';
import { dropDb } from '../../../../helpers/dropDb';
import * as faker from '../../../../helpers/faker';
import * as assertAdmin from './test.helper';
import logger from '../../modules/logger';
import * as err from '../../modules/error'; // TODO remove after devlopment

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

  /*
   * Test case: should not register a super-admin, if req.body is invalid
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

        assertAdmin.registerWithBadRequestBody(result);
      });

      test('should not register if req-body is invalid', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[0]}`)
          .send({ name: '' });

        assertAdmin.registerWithBadRequestBody(result);
      });

      test('should not register if password length is < 8 characters', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[0]}`)
          .send(assertAdmin.withShortPassword);

        assertAdmin.registerWithBadRequestBody(result);
      });

      test('should not register if password length is > 128 characters', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[0]}`)
          .send(assertAdmin.withLongPassword);

        assertAdmin.registerWithBadRequestBody(result);
      });

      test('should not register if password is weak', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[0]}`)
          .send(assertAdmin.withWeakPassword);

        assertAdmin.registerWithWeakPassword(result);
      });

      test('should not register if pass-phrase is weak', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[0]}`)
          .send(assertAdmin.withWeakPassPhrase);

        assertAdmin.registerWithWeakPassPhrase(result);
      });
    });
  });

  /*
   * Test case: Should register an super-admin, if req.body is valid.
   * There should be only one super-admin. Adding more should be prevented.
   * - test using 8 character long password
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

      test('should not register super-admin if one already exists', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[0]}`)
          .send(assertAdmin.supperAdminCredential);

        assertAdmin.registerWhileExist(result);
      });
    });
  });

  /*
   * Test case: should not register admin, if req.body is invalid
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

        assertAdmin.registerWithBadRequestBody(result);
      });

      test('should not register if req-body is invalid', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[1]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send({ name: '' });

        assertAdmin.registerWithBadRequestBody(result);
      });

      test('should not register if password length is < 8 characters', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[1]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(assertAdmin.withShortPassword);

        assertAdmin.registerWithBadRequestBody(result);
      });

      test('should not register if password length is > 128 characters', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[1]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(assertAdmin.withLongPassword);

        assertAdmin.registerWithBadRequestBody(result);
      });

      test('should not register if password is weak', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[1]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(assertAdmin.withWeakPassword);

        assertAdmin.registerWithWeakPassword(result);
      });

      test('should not register if pass-phrase is weak', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[1]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(assertAdmin.withWeakPassPhrase);

        assertAdmin.registerWithWeakPassPhrase(result);
      });
    });
  });

  /*
   * Test case: Should register an admin, if req.body is valid
   * Registering more-than one admin should be possible.
   * Should not register admin if admin with the username already exists.
   * {
   *    username: "John.Doe",
   *    password: "p-U:QaA/3G"
   * }
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

      test('should register the 2nd admin with good req-body', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[1]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(assertAdmin.thirdAdminCredential);

        assert.success(result);
      });

      test('should not register if admin already exist', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[1]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(assertAdmin.secondAdminCredential);

        assertAdmin.registerWhileExist(result);
      });
    });
  });

  /*
   * Test case: Super admin gets all admins data, including itself.
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
        ids.push(admins[2]._id);

        assertAdmin.getAdmin(result);
      });
    });
  });

  /*
   * Test-case: Super-admin all gets admin by id
   * Should not get admin with
   * - bad mongoID
   * - good but non exiting mongoID
   */
  describe(`${resourceName[1].toUpperCase()}: get one by id`, () => {
    describe(`GET /${resourceName[1]}/{id}`, () => {
      test('should get the first super-admin by id', async () => {
        const result = await chai
          .request(app)
          .get(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`);

        assertAdmin.getAdmin(result, false);
      });

      test('should get the second admin by id', async () => {
        const result = await chai
          .request(app)
          .get(`/api/v1/${resourceName[1]}/${ids[1]}`)
          .set('Authorization', `Bearer ${jwt}`);

        assertAdmin.getAdmin(result, false);
      });

      test(`should get the third admin by id ${ids[2]}`, async () => {
        const result = await chai
          .request(app)
          .get(`/api/v1/${resourceName[1]}/${ids[2]}`)
          .set('Authorization', `Bearer ${jwt}`);

        assertAdmin.getAdmin(result, false);
      });

      test('should not get admin with bad mongoose id', async () => {
        const result = await chai
          .request(app)
          .get(`/api/v1/${resourceName[1]}/${faker.invalidMongoId}`)
          .set('Authorization', `Bearer ${jwt}`);

        assert.notFound(result, 'Not a MongoId');
      });

      test('should not get admin with valid but non-existent mongoose id', async () => {
        const result = await chai
          .request(app)
          .get(`/api/v1/${resourceName[1]}/${faker.mongoId}`)
          .set('Authorization', `Bearer ${jwt}`);

        assert.notFound(result, 'No resource found with this Id');
      });
    });
  });

  /*
   * Test case: update password of
   * 1. super-admin
   * 2. admin
   * 3. non-exiting
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
      test('should not register if req-body is {}', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send({});

        assertAdmin.updateWithBadRequestBody(result);
      });

      test('should not register if req-body is invalid', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send({ name: '' });

        assertAdmin.updateWithBadRequestBody(result);
      });

      test('should not register if password length is < 8 characters', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(assertAdmin.updateWithShortPassword);

        assertAdmin.updateWithBadRequestBody(result);
      });

      test('should not register if password length is > 128 characters', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(assertAdmin.updateWithLongPassword);

        assertAdmin.updateWithBadRequestBody(result);
      });

      test('should not register if password is weak', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(assertAdmin.updateWithWeakPassword);

        assertAdmin.registerWithWeakPassword(result);
      });

      test('should not register if pass-phrase is weak', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(assertAdmin.updateWithWeakPassPhrase);

        assertAdmin.registerWithWeakPassPhrase(result);
      });

      test('new password entries do not match', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(assertAdmin.newPasswordDoNotMatch);

        const { status, data } = result.body;
        const { name, message } = data;

        expect(result).to.have.status(400);
        expect(status).to.equal('fail');
        expect(name).to.equal(err.BadRequest.name);
        expect(message).to.equal('new passwords do not match');
      });

      test('new password is the same as current', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(assertAdmin.newPasswordSameWithCurrent);

        const { status, data } = result.body;
        const { name, message } = data;

        expect(result).to.have.status(400);
        expect(status).to.equal('fail');
        expect(name).to.equal(err.BadRequest.name);
        expect(message).to.equal('new password is the same as current');
      });

      test('wrong current password', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(assertAdmin.wrongCurrentPassword);

        const { status, data } = result.body;
        const { name, message } = data;

        expect(result).to.have.status(403);
        expect(status).to.equal('fail');
        expect(name).to.equal(err.Forbidden.name);
        expect(message).to.equal('wrong current password');
      });

      test('should update super-admin password', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(assertAdmin.withGoodPassword);

        assert.success(result);
      });

      test('should update admin password', async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[1]}/${ids[1]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send({});

        const { status, data } = result.body;

        expect(result).to.have.status(201);
        expect(status).to.equal('success');
        expect(data.tempPassword).not.to.equal('');
      });
    });
  });

  describe(`${resourceName[2].toUpperCase()}:`, () => {
    describe(`POST /${resourceName[2]}`, () => {
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

  describe.skip(`${resourceName[1].toUpperCase()}:`, () => {
    describe(`GET /${resourceName[1]}`, () => {
      test.skip('test user name already exists', () => {});
    });
  });
});
