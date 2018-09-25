import chai from 'chai';
import chaiHttp from 'chai-http';
import moment from 'moment';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import * as assert from './response.validation';
import { dropDatabase, username, password } from './helper';
import { event } from './faker.request.body';
import '../api/resources/admins/admins.model';
import '../api/resources/blog/blog.model';
import '../api/resources/event/event.model';
import '../api/resources/info/info.model';
import '../api/resources/intro/intro.model';
import '../api/resources/media/media.model';
import '../api/resources/service/service.model';

chai.use(chaiHttp);
dotenv.config();
const resources = ['register', 'admins', 'event'];
const baseUrl = process.env.BACKEND_URL;
let jwt;
const ids = [];

describe('EVENT', () => {
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
    });
  });

  // super admin gets all admins data
  describe('GET: get all', () => {
    describe(`GET ${baseUrl}/api/v1/${resources[1]}`, () => {
      test('200 - Ok', async () => {
        const result = await chai
          .request(baseUrl)
          .get(`/api/v1/${resources[1]}`)
          .set('Authorization', `Bearer ${jwt}`);

        const { admins } = result.body.data;
        ids.push(admins[0]._id);

        assert.getAdminSuccess(result);
      });
    });
  });

  // event on current date
  describe('EVENT', () => {
    describe(`POST ${baseUrl}/api/v1/${resources[2]}`, () => {
      test('201 - Created - current-date', async () => {
        const result = await chai
          .request(baseUrl)
          .post(`/api/v1/${resources[2]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send({ ...event, dateEnd: moment().format(), dateStart: moment().format() });

        assert.postSuccess(result);
      });
    });
  });

  // event start date in the past
  describe('CURRENT DATE: past', () => {
    describe(`POST ${baseUrl}/api/v1//${resources[2]}`, () => {
      test('400 Error: BadRequest - start-date in past', async () => {
        const result = await chai
          .request(baseUrl)
          .post(`/api/v1/${resources[2]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send({ ...event, dateStart: '2018-01-23T02:47:38.412Z' });

        assert.badRequest(result, 'start date must be greater than or equal to now');
      });
    });
  });

  // past event start-date is after end-date
  describe('END DATE: past', () => {
    describe(`POST ${baseUrl}/api/v1/${resources[2]}`, () => {
      test('400 Error: BadRequest - end-date in past', async () => {
        const result = await chai
          .request(baseUrl)
          .post(`/api/v1/${resources[2]}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send({ ...event, dateEnd: '2018-07-23T02:47:38.412Z' });

        assert.badRequest(result, 'end date must be greater than start date');
      });
    });
  });

  // valid future date event
  describe('START AND END DATE: future', () => {
    describe(`POST ${baseUrl}/api/v1/${resources[2]}`, () => {
      test('201 - Created - current-date', async () => {
        const result = await chai
          .request(baseUrl)
          .post(`/api/v1/${resources[2]}`)
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
  describe('DELETE', () => {
    describe(`DELETE ${baseUrl}/api/v1/${resources[1]}`, () => {
      test('202 - Accepted', async () => {
        const result = await chai
          .request(baseUrl)
          .delete(`/api/v1/${resources[1]}/${ids[0]}`)
          .set('Authorization', `Bearer ${jwt}`);

        assert.deleteSuccess(result);
      });
    });
  });
});
