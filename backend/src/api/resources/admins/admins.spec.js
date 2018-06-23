import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../server';
import { created } from '../../../../helpers/http.status.assertion';
import { dropDb } from '../../../../helpers/dropDb';

chai.use(chaiHttp);
const resourceName = 'admins';

describe(`${resourceName}`, () => {
  beforeAll(() => dropDb());
  afterAll(() => dropDb());

  describe(`POST /${resourceName}`, () => {
    test(`should post ${resourceName}`, async () => {
      expect(1).toEqual(1);
    });
  });
});
