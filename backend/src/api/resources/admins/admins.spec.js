import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../server';
import { created } from '../../../../helpers/http.status.assertion';
import { dropDb } from '../../../../helpers/dropDb';
import * as faker from '../../../../helpers/faker';
import * as err from '../../modules/error';
import * as assert from './test.helper';

chai.use(chaiHttp);
const resourceName = ['register', 'admins', 'signin'];
const adminUser = faker.model.admin;
let jwt;

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

        assert.withoutToken(result);
      });

      test(`should not create ${resourceName[1]} with-invalid-token`, async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[1]}`)
          .set('Authorization', `Bearer ${faker.token}`)
          .send({ ...adminUser });

        assert.withInvalidToken(result);
      });
    });

    describe(`GET /${resourceName[1]}`, () => {
      test(`should not get ${resourceName[1]} without-token`, async () => {
        const result = await chai.request(app).get(`/api/v1/${resourceName[1]}`);

        assert.withoutToken(result);
      });

      test(`should not get ${resourceName[1]} with-invalid-token`, async () => {
        const result = await chai
          .request(app)
          .get(`/api/v1/${resourceName[1]}`)
          .set('Authorization', `Bearer ${faker.token}`);

        assert.withInvalidToken(result);
      });
    });

    describe(`GET /${resourceName[1]}/${faker.mongoId}`, () => {
      test(`should not get ${resourceName[1]}/${faker.mongoId} without-token`, async () => {
        const result = await chai.request(app).get(`/api/v1/${resourceName[1]}/${faker.mongoId}`);

        assert.withoutToken(result);
      });

      test(`should not get ${resourceName[1]}/${faker.mongoId} with-invalid-token`, async () => {
        const result = await chai
          .request(app)
          .get(`/api/v1/${resourceName[1]}/${faker.mongoId}`)
          .set('Authorization', `Bearer ${faker.token}`);

        assert.withInvalidToken(result);
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

        assert.withoutToken(result);
      });

      test(`should not update ${resourceName[1]}/${faker.mongoId} with-invalid-token`, async () => {
        const result = await chai
          .request(app)
          .put(`/api/v1/${resourceName[1]}/${faker.mongoId}`)
          .set('Authorization', `Bearer ${faker.token}`)
          .send(updatePassword);

        assert.withInvalidToken(result);
      });
    });

    describe(`DELETE /${resourceName[1]}/${faker.mongoId}`, () => {
      test(`should not delete ${resourceName[1]}/${faker.mongoId} without-token`, async () => {
        const result = await chai
          .request(app)
          .delete(`/api/v1/${resourceName[1]}/${faker.mongoId}`);

        assert.withoutToken(result);
      });

      test(`should not delete ${resourceName[1]}/${faker.mongoId} with-invalid-token`, async () => {
        const result = await chai
          .request(app)
          .delete(`/api/v1/${resourceName[1]}/${faker.mongoId}`)
          .set('Authorization', `Bearer ${faker.token}`);

        assert.withInvalidToken(result);
      });
    });
  });
  /*
   * Should not register a super-admin, if req.body is
   * - {}
   * - invalid schema, e.g. { name: '' },
   * - password is < 8 characters
   * - password is > 128 characters
   */
  describe(`${resourceName[0]}: with-bad-req.body`, () => {
    describe(`POST /${resourceName[0]}`, () => {
      test('should not register if req.body is {}', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[0]}`)
          .send({});

        assert.withInvalidReqBody(result);
      });

      test('should not register if req.body is invalid', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[0]}`)
          .send({ name: '' });

        assert.withInvalidReqBody(result);
      });

      test('should not register if password length is < 8 characters', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[0]}`)
          .send(assert.withShortPassword);

        assert.withInvalidReqBody(result);
      });

      test('should not register if password length is > 128 characters', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[0]}`)
          .send(assert.withLongPassword);

        assert.withInvalidReqBody(result);
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
          .send(assert.withWeakPassword);

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
          .send(assert.withWeakPassPhrase);

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
  describe(`POST /${resourceName[1]}: with good-body`, () => {
    test('should register super-admin', async () => {
      const result = await chai
        .request(app)
        .post(`/api/v1/${resourceName[0]}`)
        .send(assert.with8CharacterPassword);

      const { status, data } = result.body;
      const { token } = data;
      jwt = token;

      expect(result).to.have.status(201);
      expect(status).to.equal('success');
    });

    test('should not register super-admin if exist', async () => {
      const result = await chai
        .request(app)
        .post(`/api/v1/${resourceName[0]}`)
        .send(assert.with8CharacterPassword);

      const { status, data } = result.body;
      const { name, message } = data;

      expect(result).to.have.status(403);
      expect(status).to.equal('fail');
      expect(name).to.equal(err.Forbidden.name);
      expect(message).to.equal('Admin already exist');
    });
  });

  describe(`POST/DELETE /${resourceName[1]}`, () => {
    test.skip('should create if not exist', () => {});
    test.skip('should create with password = 128 and delete', () => {});
    test.skip('should try to create with the same user name, error', () => {});
    test.skip('should create with password = 8 and delete', () => {});
    test.skip('should delete', () => {});
    test.skip('should create with password between 8 and 128 chars and delete', () => {});
    test.skip('should not create if exist', () => {});
  });
});
