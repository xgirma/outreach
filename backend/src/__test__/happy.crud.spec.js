/* eslint-disable array-callback-return, consistent-return */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import faker from 'faker';
import '../api/resources/admins/admins.model';
import '../api/resources/blog/blog.model';
import '../api/resources/event/event.model';
import '../api/resources/info/info.model';
import '../api/resources/intro/intro.model';
import '../api/resources/media/media.model';
import '../api/resources/service/service.model';
import { admin, info, intro, event, services, blog, media } from './faker.request.body';
import { dropDatabase } from './helper';
import * as assert from './response.validation';

chai.use(chaiHttp);
dotenv.config();

const resources = ['info', 'intro', 'event', 'services', 'blog', 'media'];
let jwt;
const ids = {};
const baseUrl = process.env.BACKEND_URL;

describe('HAPPY PATH', () => {
  beforeAll(async () => {
    await dropDatabase();
    mongoose.connection.close(() => {});
  });

  afterAll(async () => {
    await dropDatabase();
    mongoose.connection.close(() => {});
  });

  /*
   * Register:
   * Create super-admin and save jwt token
   * This super-admin user will be used for all following CRUD tests.
   */
  describe(`POST: ${baseUrl}/api/v1/register { username: ${admin.username}, password: ${
    admin.password
  } }`, () => {
    test('201 - Created', async () => {
      const result = await chai
        .request(baseUrl)
        .post('/api/v1/register')
        .send(admin);

      const { status, data } = result.body;
      const { token } = data;
      jwt = token;

      expect(result).to.have.status(201);
      expect(status).to.equal('success');
      expect(token).not.to.equal('');
    });
  });

  /*
   * CRUD
   * GET {}, POST, GET all, GET by ID, PUT by ID, DELETE by ID
   * for all resources, except /admin
   */
  describe('CRUD', () =>
    /* eslint-disable-next-line */
    resources.map((resourceName) => {
      describe(`GET ${baseUrl}/api/v1/${resourceName}`, () => {
        test('200 - OK - no data', async () => {
          const result = await chai
            .request(baseUrl)
            .get(`/api/v1/${resourceName}`)
            .set('Authorization', `Bearer ${jwt}`);

          assert.getSuccessWithNoData(result);
        });
      });

      describe(`POST ${baseUrl}/api/v1/${resourceName}`, () => {
        let requestBody;
        switch (resourceName) {
          case 'info':
            requestBody = info;
            break;
          case 'intro':
            requestBody = intro;
            break;
          case 'event':
            requestBody = event;
            break;
          case 'services':
            requestBody = services;
            break;
          case 'blog':
            requestBody = blog;
            break;
          case 'media':
            requestBody = media;
            break;
          default:
            requestBody = {};
        }

        test('201 - Created', async () => {
          const result = await chai
            .request(baseUrl)
            .post(`/api/v1/${resourceName}`)
            .set('Authorization', `Bearer ${jwt}`)
            .send(requestBody);

          assert.postSuccess(result);
        });
      });

      describe(`GET ${baseUrl}/api/v1/${resourceName}`, () => {
        test('200 - OK - data', async () => {
          const result = await chai
            .request(baseUrl)
            .get(`/api/v1/${resourceName}`)
            .set('Authorization', `Bearer ${jwt}`);

          const { data } = result.body;
          ids[resourceName] = data[0]._id;
          assert.getSuccess(result);
        });
      });

      describe(`GET ${baseUrl}/api/v1/${resourceName}/id`, () => {
        test('200 - OK - by id', async () => {
          const result = await chai
            .request(baseUrl)
            .get(`/api/v1/${resourceName}/${ids[resourceName]}`)
            .set('Authorization', `Bearer ${jwt}`);

          assert.getSuccess(result);
        });
      });

      describe(`PUT ${baseUrl}/api/v1/${resourceName}/id`, () => {
        test('202 - Accepted', async () => {
          let update = {};
          const phone = faker.phone.phoneNumber();
          const dateStart = faker.date.future(2);
          const email = faker.internet.email().toLowerCase();
          const author = faker.name.findName();
          const url = faker.internet.url();

          switch (resourceName) {
            case 'info':
              update = { ...info, phone };
              break;
            case 'intro':
              update = { ...intro, en: { ...intro.en, author } };
              break;
            case 'event':
              update = { ...event, dateStart };
              break;
            case 'services':
              update = { ...services, email };
              break;
            case 'blog':
              update = { ...blog, author };
              break;
            case 'media':
              update = { ...media, url };
              break;
            default:
              update = {};
          }

          const result = await chai
            .request(baseUrl)
            .put(`/api/v1/${resourceName}/${ids[resourceName]}`)
            .set('Authorization', `Bearer ${jwt}`)
            .send(update);

          assert.putSuccess(result);

          const { data } = result.body;
          switch (resourceName) {
            case 'info':
              return () => {
                Object.keys(data).map((d) => expect(d.phone).to.equal(phone));
              };
            case 'intro':
              return () => {
                Object.keys(data).map((d) => expect(d.en.author).to.equal(author));
              };
            case 'event':
              return () => {
                Object.keys(data).map((d) => expect(d.date_start).to.equal(dateStart));
              };
            case 'services':
              return () => {
                Object.keys(data).map((d) => expect(d.email).to.equal(email));
              };
            case 'blog':
              return () => {
                Object.keys(data).map((d) => expect(d.author).to.equal(author));
              };
            case 'media':
              return () => {
                Object.keys(data).map((d) => expect(d.url).to.equal(url));
              };
            default:
              update = {};
          }
        });
      });

      describe(`DELETE ${baseUrl}/api/v1/${resourceName}/id`, () => {
        test('202 - Accepted', async () => {
          const result = await chai
            .request(baseUrl)
            .delete(`/api/v1/${resourceName}/${ids[resourceName]}`)
            .set('Authorization', `Bearer ${jwt}`);

          assert.deleteSuccess(result);
        });
      });
    }));
});
