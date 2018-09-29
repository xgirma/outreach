/* eslint-disable array-callback-return */
import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import * as assert from '../bad.authorization.validation';
import { dropDatabase, mongoId } from '../helper';
import '../../api/resources/admins/admins.model';
import '../../api/resources/blog/blog.model';
import '../../api/resources/event/event.model';
import '../../api/resources/info/info.model';
import '../../api/resources/intro/intro.model';
import '../../api/resources/media/media.model';
import '../../api/resources/service/service.model';

chai.use(chaiHttp);
dotenv.config();
const resources = ['admins', 'info', 'intro', 'event', 'service', 'blog', 'media'];
const baseUrl = process.env.BACKEND_URL;

/*
 * protected resources should only be accesses
 * with valid token, but not
 * - without token
 * - with expired token
 * - token with invalid signature
 */
describe('PROTECTED RESOURCES', () => {
  beforeAll(async () => {
    await dropDatabase();
    mongoose.connection.close(() => {});
  });

  afterAll(async () => {
    await dropDatabase();
    mongoose.connection.close(() => {});
  });

  describe('TOKEN TEST', () => {
    resources.map((resourceName) => {
      describe(`POST: ${baseUrl}/${resourceName}`, () => {
        assert.postWithoutToken(resourceName);
        assert.postWithExpiredToken(resourceName);
        assert.postUsingTokenWithInvalidSignature(resourceName);
        assert.postMalformedToken(resourceName);
        assert.postWithBadFormattedToken(resourceName);
      });

      describe(`GET: ${baseUrl}/${resourceName}`, () => {
        assert.getWithoutToken(resourceName);
        assert.getWithExpiredToken(resourceName);
        assert.getUsingTokenWithInvalidSignature(resourceName);
        assert.getMalformedToken(resourceName);
        assert.getWithBadFormattedToken(resourceName);
      });

      describe(`GET: ${baseUrl}/${resourceName}/${mongoId}`, () => {
        assert.getWithoutToken(`${resourceName}/${mongoId}`);
        assert.getWithExpiredToken(`${resourceName}/${mongoId}`);
        assert.getUsingTokenWithInvalidSignature(`${resourceName}/${mongoId}`);
        assert.getMalformedToken(`${resourceName}/${mongoId}`);
        assert.getWithBadFormattedToken(`${resourceName}/${mongoId}`);
      });

      describe(`PUT: ${baseUrl}/${resourceName}/${mongoId}`, () => {
        assert.putWithoutToken(`${resourceName}/${mongoId}`);
        assert.putWithExpiredToken(`${resourceName}/${mongoId}`);
        assert.putUsingTokenWithInvalidSignature(`${resourceName}/${mongoId}`);
        assert.putMalformedToken(`${resourceName}/${mongoId}`);
        assert.putWithBadFormattedToken(`${resourceName}/${mongoId}`);
      });

      describe(`DELETE: ${baseUrl}/${resourceName}/${mongoId}`, () => {
        assert.deleteWithoutToken(`${resourceName}/${mongoId}`);
        assert.deleteWithExpiredToken(`${resourceName}/${mongoId}`);
        assert.deleteUsingTokenWithInvalidSignature(`${resourceName}/${mongoId}`);
        assert.deleteMalformedToken(`${resourceName}/${mongoId}`);
        assert.deleteWithBadFormattedToken(`${resourceName}/${mongoId}`);
      });
    });
  });
});
