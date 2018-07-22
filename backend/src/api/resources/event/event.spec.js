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

  // should register an super-admin
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

  // super admin gets all admins data
  describe(`${resourceName[1].toUpperCase()}: get all`, () => {
    describe(`GET /${resourceName[1]}`, () => {
      test('super-admin: should GET admins', async () => {
        const result = await chai
          .request(app)
          .get(`/api/v1/${resourceName[1]}`)
          .set('Authorization', `Bearer ${jwt}`);

        const { admins } = result.body.data;
        ids.push(admins[0]._id); // gets super-admin ID

        assert.getAdminSuccess(result);
      });
    });
  });

  // creates past event
  describe(`${resourceName[2].toUpperCase()}:`, () => {
    describe(`POST /${resourceName[2]}`, () => {
      test.skip('admin: admin should be able to signin', async () => {
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

  // creates current date event
  describe(`${resourceName[1].toUpperCase()}: get self only`, () => {
    describe(`GET /${resourceName[1]}/${ids[1]}`, () => {
      test.skip('admin: should GET itself', async () => {
        const result = await chai
          .request(app)
          .get(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`);

        assert.getAdminSuccess(result, false);
      });
    });
  });

  // creates future event
  describe(`${resourceName[1].toUpperCase()}: get self only`, () => {
    describe(`GET /${resourceName[1]}/${ids[1]}`, () => {
      test.skip('admin: should GET itself', async () => {
        const result = await chai
          .request(app)
          .get(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`);

        assert.getAdminSuccess(result, false);
      });
    });
  });

  // gets past events
  describe(`${resourceName[1].toUpperCase()}: get self only`, () => {
    describe(`GET /${resourceName[1]}/${ids[1]}`, () => {
      test.skip('admin: should GET itself', async () => {
        const result = await chai
          .request(app)
          .get(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`);

        assert.getAdminSuccess(result, false);
      });
    });
  });

  // gets future events
  describe(`${resourceName[1].toUpperCase()}: get self only`, () => {
    describe(`GET /${resourceName[1]}/${ids[1]}`, () => {
      test.skip('admin: should GET itself', async () => {
        const result = await chai
          .request(app)
          .get(`/api/v1/${resourceName[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`);

        assert.getAdminSuccess(result, false);
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
