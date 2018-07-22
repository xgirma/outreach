import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../../server';
import { dropDatabase } from './database';
import * as assert from './crud.validator';
import { admin, info, event, services, blog, media } from './request.body';

chai.use(chaiHttp);

const resources = ['info', 'event', 'services', 'blog', 'media']; // TODO see if event can be added
let jwt;
const ids = {};

describe(`Route: ${resources.join(', ').toUpperCase()}`, () => {
  beforeAll(async () => {
    await dropDatabase();
  });

  afterAll(async () => {
    await dropDatabase();
  });

  /*
   * Test setup
   * create super-admin and save jwt token
   * Super-admin user will be used for all resource tests.
   */
  describe('POST /register', () => {
    test('should register super-admin', async () => {
      const result = await chai
        .request(app)
        .post('/api/v1/register')
        .send(admin);

      const { status, data } = result.body;
      const { token } = data;
      jwt = token; // super-admin token saved

      expect(result).to.have.status(201);
      expect(status).to.equal('success');
      expect(token).not.to.equal('');
    });
  });

  /*
   * Test
   * Common GET, POST, GET, GET by ID, PUT by ID, DELETE by ID
   * for all resources, except /admin
   */
  describe('resources happy path', () =>
    /* eslint-disable-next-line */
    resources.map((resourceName) => {
      describe(`GET /${resourceName}`, () => {
        test(`should GET /${resourceName} []`, async () => {
          const result = await chai
            .request(app)
            .get(`/api/v1/${resourceName}`)
            .set('Authorization', `Bearer ${jwt}`);

          assert.getSuccessNoData(result);
        });
      });

      describe(`POST /${resourceName}`, () => {
        let requestBody;
        switch (resourceName) {
          case 'info':
            requestBody = info;
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

        test(`should POST /${resourceName}`, async () => {
          const result = await chai
            .request(app)
            .post(`/api/v1/${resourceName}`)
            .set('Authorization', `Bearer ${jwt}`)
            .send(requestBody);

          assert.postSuccess(result);
        });
      });

      describe(`GET /${resourceName}`, () => {
        test(`should GET /${resourceName}`, async () => {
          const result = await chai
            .request(app)
            .get(`/api/v1/${resourceName}`)
            .set('Authorization', `Bearer ${jwt}`);

          const { data } = result.body;
          ids[resourceName] = data[0]._id;
          assert.getSuccess(result);
        });
      });

      describe(`GET /${resourceName}/{id}`, () => {
        test(`should GET /${resourceName}/{id}}`, async () => {
          const result = await chai
            .request(app)
            .get(`/api/v1/${resourceName}/${ids[resourceName]}`)
            .set('Authorization', `Bearer ${jwt}`);

          assert.getSuccess(result);
        });
      });

      describe(`PUT /${resourceName}/{id}`, () => {
        /* eslint-disable-next-line */
        test(`should update PUT /${resourceName}`, async () => {
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
            .request(app)
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

      describe(`DELETE /${resourceName}/{id}`, () => {
        test(`should DELETE /${resourceName}/{id}}`, async () => {
          const result = await chai
            .request(app)
            .delete(`/api/v1/${resourceName}/${ids[resourceName]}`)
            .set('Authorization', `Bearer ${jwt}`);

          assert.deleteSuccess(result);
        });
      });
    }));
});
