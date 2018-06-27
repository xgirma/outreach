/* eslint-disable no-underscore-dangle */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../server';
import * as assert from '../../../../helpers/http.status.assertion';
import { dropDb } from '../../../../helpers/dropDb';
import * as faker from '../../../../helpers/faker';
import * as err from '../../modules/error';
import * as assertAdmin from './test.helper';

chai.use(chaiHttp);
const resourceName = ['register', 'admins', 'signin'];
const adminUser = faker.model.admin;
let jwt;
const ids = [];

describe(`Route: ${resourceName.join(', ')}`, () => {
  beforeAll(async () => {
    await dropDb();
  });

  afterAll(async () => {
    await dropDb();
  });

  /*
   * An attempt to use resources, without-token or with-invalid-token
   * Should be prevented.
   */
  describe(`${resourceName[1]}: without-token and with-invalid-token`, () => {
    describe(`POST /${resourceName[1]}`, () => {
      test(`should not create ${resourceName[1]} without-token`, async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[1]}`)
          .send({ ...adminUser });

        assertAdmin.withoutToken(result);
      });

      test(`should not create ${resourceName[1]} with-invalid-token`, async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[1]}`)
          .set('Authorization', `Bearer ${faker.token}`)
          .send({ ...adminUser });

        assertAdmin.withInvalidToken(result);
      });
    });

    describe(`GET /${resourceName[1]}`, () => {
      test(`should not get ${resourceName[1]} without-token`, async () => {
        const result = await chai.request(app).get(`/api/v1/${resourceName[1]}`);

        assertAdmin.withoutToken(result);
      });

      test(`should not get ${resourceName[1]} with-invalid-token`, async () => {
        const result = await chai
          .request(app)
          .get(`/api/v1/${resourceName[1]}`)
          .set('Authorization', `Bearer ${faker.token}`);

        assertAdmin.withInvalidToken(result);
      });
    });

    describe(`GET /${resourceName[1]}/${faker.mongoId}`, () => {
      test(`should not get ${resourceName[1]}/${faker.mongoId} without-token`, async () => {
        const result = await chai.request(app).get(`/api/v1/${resourceName[1]}/${faker.mongoId}`);

        assertAdmin.withoutToken(result);
      });

      test(`should not get ${resourceName[1]}/${faker.mongoId} with-invalid-token`, async () => {
        const result = await chai
          .request(app)
          .get(`/api/v1/${resourceName[1]}/${faker.mongoId}`)
          .set('Authorization', `Bearer ${faker.token}`);

        assertAdmin.withInvalidToken(result);
      });
    });

    describe(`PUT /${resourceName[1]}/${faker.mongoId}`, () => {
      const updatePassword = {
        currentPassword: faker.strongPassword,
        newPassword: faker.newPassword,
        newPasswordAgain: faker.newPasswordAgain,
      };

      test(`should not update ${resourceName[1]}/${faker.mongoId} without-token`, async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[1]}/${faker.mongoId}`)
          .send(updatePassword);

        assertAdmin.withoutToken(result);
      });

      test(`should not update ${resourceName[1]}/${faker.mongoId} with-invalid-token`, async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[1]}/${faker.mongoId}`)
          .set('Authorization', `Bearer ${faker.token}`)
          .send(updatePassword);

        assertAdmin.withInvalidToken(result);
      });
    });

    describe(`DELETE /${resourceName[1]}/${faker.mongoId}`, () => {
      test(`should not delete ${resourceName[1]}/${faker.mongoId} without-token`, async () => {
        const result = await chai
          .request(app)
          .delete(`/api/v1/${resourceName[1]}/${faker.mongoId}`);

        assertAdmin.withoutToken(result);
      });

      test(`should not delete ${resourceName[1]}/${faker.mongoId} with-invalid-token`, async () => {
        const result = await chai
          .request(app)
          .delete(`/api/v1/${resourceName[1]}/${faker.mongoId}`)
          .set('Authorization', `Bearer ${faker.token}`);

        assertAdmin.withInvalidToken(result);
      });
    });
  });
  /*
   * Should not register a super-admin, if req.body is invalid
   * - {}
   * - invalid schema, e.g. { name: '' },
   * - password is < 8 characters
   * - password is > 128 characters
   */
  describe(`${resourceName[0]}: with-bad-req-body`, () => {
    describe(`POST /${resourceName[0]}`, () => {
      test('should not register if req-body is {}', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[0]}`)
          .send({});

        assertAdmin.withInvalidReqBody(result);
      });

      test('should not register if req-body is invalid', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[0]}`)
          .send({ name: '' });

        assertAdmin.withInvalidReqBody(result);
      });

      test('should not register if password length is < 8 characters', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[0]}`)
          .send(assertAdmin.withShortPassword);

        assertAdmin.withInvalidReqBody(result);
      });

      test('should not register if password length is > 128 characters', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[0]}`)
          .send(assertAdmin.withLongPassword);

        assertAdmin.withInvalidReqBody(result);
      });
    });
  });

  /*
   * Should not register a super-/admin, if password is between 8
   * and 128 characters,
   * - weak by OWASP Password Strength Test
   * - minimum pass-phrase length < 20 characters
   */
  describe(`${resourceName[0]}: with-weak-password`, () => {
    describe(`POST /${resourceName[0]}`, () => {
      const weakPasswordErrors = [
        'The password must contain at least one uppercase letter.',
        'The password must contain at least one number.',
        'The password must contain at least one special character.',
      ];

      test('should not register with weak-password', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[0]}`)
          .send(assertAdmin.withWeakPassword);

        const { status, data } = result.body;
        const { name, message } = data;

        expect(result).to.have.status(400);
        expect(status).to.equal('fail');
        expect(name).to.equal(err.WeakPassword.name);
        expect(message).to.equal(`${weakPasswordErrors.join(' ')}`);
      });

      test('should not register with weak-pass-phrase', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[0]}`)
          .send(assertAdmin.withWeakPassPhrase);

        const { status, data } = result.body;
        const { name, message } = data;

        expect(result).to.have.status(400);
        expect(status).to.equal('fail');
        expect(name).to.equal(err.WeakPassword.name);
        expect(message).to.equal(`${weakPasswordErrors[0]} ${weakPasswordErrors[1]}`);
      });
    });
  });

  /*
   * Should register super-admin if it does not exist
   * - using 8 character long password
   */
  describe(`${resourceName[0]}: with-good-body`, () => {
    describe(`POST /${resourceName[0]}`, () => {
      test('should register super-admin', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[0]}`)
          .send(assertAdmin.with8CharacterPassword);

        const { status, data } = result.body;
        const { token } = data;
        jwt = token;

        expect(result).to.have.status(201);
        expect(status).to.equal('success');
      });

      test('should not register super-admin if it exists', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[0]}`)
          .send(assertAdmin.with8CharacterPassword);

        const { status, data } = result.body;
        const { name, message } = data;

        expect(result).to.have.status(403);
        expect(status).to.equal('fail');
        expect(name).to.equal(err.Forbidden.name);
        expect(message).to.equal('Admin already exists');
      });
    });
  });

  /*
   * Should not register an admin, if req.body is invalid
   * - {}
   * - invalid schema, e.g. { username: 'John.Pop' },
   */
  describe(`${resourceName[1]}: with-bad-req-body`, () => {
    describe(`POST /${resourceName[1]}`, () => {
      test('should not register if req.body is {}', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[1]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send({});

        assertAdmin.withInvalidReqBody(result);
      });

      test('should not register if req-body is invalid', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[1]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send({ username: 'John.Pop' });

        assertAdmin.withInvalidReqBody(result);
      });
    });
  });

  /*
   * Should register an admin, if req.body is valid
   * Should not register an admin, if username already exists in database
   */
  describe(`${resourceName[1]}: with-good-req-body`, () => {
    describe(`POST /${resourceName[1]}`, () => {
      test('should register if req.body is good', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[1]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(assertAdmin.withGoodPassword);

        assertAdmin.withValidReqBody(result);
      });

      test('should not register if admin already exists', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[1]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send(assertAdmin.withGoodPassword);

        assertAdmin.adminAlreadyExists(result);
      });
    });
  });

  /*
   * Super admin gets all admins data
   */
  describe(`${resourceName[1]}:`, () => {
    describe(`GET /${resourceName[1]}`, () => {
      test('should get all admins', async () => {
        const result = await chai
          .request(app)
          .get(`/api/v1/${resourceName[1]}`)
          .set('Authorization', `Bearer ${jwt}`);

        const { admins } = result.body.data;
        ids.push(admins[0]._id);
        ids.push(admins[1]._id);

        assertAdmin.getAllAdmins(result);
      });
    });
  });

  /*
   * Super admin gets admin by id
   */
  describe(`${resourceName[1]}:`, () => {
    describe(`GET /${resourceName[1]}/{id}`, () => {
      test('should get the first admin (super-admin) by id', async () => {
        const result = await chai
          .request(app)
          .get(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`);

        assertAdmin.getAllAdmins(result, false);
      });

      test('should get the second admin (admin) by id', async () => {
        const result = await chai
          .request(app)
          .get(`/api/v1/${resourceName[1]}/${ids[1]}`)
          .set('Authorization', `Bearer ${jwt}`);

        assertAdmin.getAllAdmins(result, false);
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

  describe(`${resourceName[1]}:`, () => {
    describe(`GET /${resourceName[1]}`, () => {
      test.skip('test user name already exists', () => {});
      test.skip('get all with admin', () => {});
      test.skip('get {id} with admin', () => {});
      test.skip('get {id} with admin', () => {});
    });
  });
});
