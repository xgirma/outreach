import chai from 'chai';
import chaiHttp from 'chai-http';
import moment from 'moment';
import app from '../../../server';
import * as assert from '../../__tests_/crud.validator';
import { dropDatabase } from '../../__tests_/database';
import { event } from '../../__tests_/request.body';
import * as co from '../../__tests_/constants';

chai.use(chaiHttp);
const resourceName = ['register', 'admins', 'event'];
let jwt;
const ids = [];
const { STRONG } = co.password;
const { SUPER_ADMIN } = co.username;

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

  // event on current date
  describe(`${resourceName[2].toUpperCase()}:`, () => {
    describe(`POST /${resourceName[2]}`, () => {
      test('super-admin: creates event for current date', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[2]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send({ ...event, dateEnd: moment().format(), dateStart: moment().format() });

        assert.postSuccess(result);
      });
    });
  });

  // event start date in the past
  describe(`${resourceName[2].toUpperCase()}:`, () => {
    describe(`POST /${resourceName[2]}`, () => {
      test('super-admin: event start date should be current date and after', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[2]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send({ ...event, dateStart: '2018-01-23T02:47:38.412Z' });

        assert.badRequest(result, 'start date must be greater than or equal to now');
      });
    });
  });

  // past event start-date is after end-date
  describe(`${resourceName[2].toUpperCase()}:`, () => {
    describe(`POST /${resourceName[2]}`, () => {
      test('super-admin: event start-date should not be after end-date', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[2]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send({ ...event, dateEnd: '2018-07-23T02:47:38.412Z' });

        assert.badRequest(result, 'end date must be greater than start date');
      });
    });
  });

  // valid future date event
  describe(`${resourceName[2].toUpperCase()}:`, () => {
    describe(`POST /${resourceName[2]}`, () => {
      test('super-admin: should create future events', async () => {
        const result = await chai
          .request(app)
          .post(`/api/v1/${resourceName[2]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send({
            ...event,
            dateEnd: moment()
              .add(17, 'days')
              .format(),
            dateStart: moment()
              .add(7, 'days')
              .format(),
          });

        assert.postSuccess(result);
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
