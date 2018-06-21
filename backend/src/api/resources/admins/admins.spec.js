import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../server';
import { created } from '../../../../helpers/http.status.assertion';

chai.use(chaiHttp);
const resourceName = 'admins';

describe(`${resourceName}`, () => {
  describe(`POST /${resourceName}`, () => {
    test(`should post ${resourceName}`, async () => {
      const result = await chai
        .request(app)
        .post(`/api/v1/${resourceName}`)
        .send('');

      created(result);
    });
  });
});
