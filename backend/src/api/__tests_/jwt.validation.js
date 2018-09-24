/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import app from '../../server';
import * as assert from './crud.validator';
import {
  EXPIRED_TOKEN,
  INVALID_SIGNATURE_TOKEN,
  MALFORMED_TOKEN,
  BAD_FORMAT_TOKEN,
} from './constants';

export const getWithoutToken = (resource) => {
  test(`should not GET: /${resource} without-token`, async () => {
    const result = await chai.request(app).get(`/api/v1/${resource}`);

    assert.unauthorizedError(result);
  });
};

export const getWithExpiredToken = (resource) => {
  test(`should not GET: /${resource} with expired token`, async () => {
    const result = await chai
      .request(app)
      .get(`/api/v1/${resource}`)
      .set('Authorization', `Bearer ${EXPIRED_TOKEN}`);

    assert.unauthorizedError(result);
  });
};

export const getUsingTokenWithInvalidSignature = (resource) => {
  test(`should not GET: /${resource} using token with invalid signature`, async () => {
    const result = await chai
      .request(app)
      .get(`/api/v1/${resource}`)
      .set('Authorization', `Bearer ${INVALID_SIGNATURE_TOKEN}`);

    assert.unauthorizedError(result);
  });
};

export const getMalformedToken = (resource) => {
  test(`should not GET: /${resource} with malformed token`, async () => {
    const result = await chai
      .request(app)
      .get(`/api/v1/${resource}`)
      .set('Authorization', `Bearer ${MALFORMED_TOKEN}`);

    assert.unauthorizedError(result);
  });
};

export const getWithBadFormattedToken = (resources) => {
  test(`should not GET: /${resources} with bad-formatted token`, async () => {
    const result = await chai
      .request(app)
      .get(`/api/v1/${resources}`)
      .set('Authorization', `Bearer ${BAD_FORMAT_TOKEN}`);

    assert.unauthorizedError(result);
  });
};

export const postWithoutToken = (resource) => {
  test(`should not POST: /${resource} without-token`, async () => {
    const result = await chai
      .request(app)
      .post(`/api/v1/${resource}`)
      .send({});

    assert.unauthorizedError(result);
  });
};

export const postWithExpiredToken = (resource) => {
  test(`should not POST: /${resource} with expired token`, async () => {
    const result = await chai
      .request(app)
      .post(`/api/v1/${resource}`)
      .set('Authorization', `Bearer ${EXPIRED_TOKEN}`)
      .send({});

    assert.unauthorizedError(result);
  });
};

export const postUsingTokenWithInvalidSignature = (resource) => {
  test(`should not POST: /${resource} using token with invalid signature`, async () => {
    const result = await chai
      .request(app)
      .post(`/api/v1/${resource}`)
      .set('Authorization', `Bearer ${INVALID_SIGNATURE_TOKEN}`)
      .send({});

    assert.unauthorizedError(result);
  });
};

export const postMalformedToken = (resource) => {
  test(`should not POST: /${resource} with malformed token`, async () => {
    const result = await chai
      .request(app)
      .post(`/api/v1/${resource}`)
      .set('Authorization', `Bearer ${MALFORMED_TOKEN}`)
      .send({});

    assert.unauthorizedError(result);
  });
};

export const postWithBadFormattedToken = (resources) => {
  test(`should not POST: /${resources} with bad-formatted token`, async () => {
    const result = await chai
      .request(app)
      .post(`/api/v1/${resources}`)
      .set('Authorization', `Bearer ${BAD_FORMAT_TOKEN}`)
      .send({});

    assert.unauthorizedError(result);
  });
};

export const putWithoutToken = (resource) => {
  test(`should not PUT: /${resource} without-token`, async () => {
    const result = await chai
      .request(app)
      .get(`/api/v1/${resource}`)
      .send({});

    assert.unauthorizedError(result);
  });
};

export const putWithExpiredToken = (resource) => {
  test(`should not PUT: /${resource} with expired token`, async () => {
    const result = await chai
      .request(app)
      .post(`/api/v1/${resource}`)
      .set('Authorization', `Bearer ${EXPIRED_TOKEN}`)
      .send({});

    assert.unauthorizedError(result);
  });
};

export const putUsingTokenWithInvalidSignature = (resource) => {
  test(`should not PUT: /${resource} using token with invalid signature`, async () => {
    const result = await chai
      .request(app)
      .put(`/api/v1/${resource}`)
      .set('Authorization', `Bearer ${INVALID_SIGNATURE_TOKEN}`)
      .send({});

    assert.unauthorizedError(result);
  });
};

export const putMalformedToken = (resource) => {
  test(`should not PUT: /${resource} with malformed token`, async () => {
    const result = await chai
      .request(app)
      .put(`/api/v1/${resource}`)
      .set('Authorization', `Bearer ${MALFORMED_TOKEN}`)
      .send({});

    assert.unauthorizedError(result);
  });
};

export const putWithBadFormattedToken = (resources) => {
  test(`should not PUT: /${resources} with bad-formatted token`, async () => {
    const result = await chai
      .request(app)
      .put(`/api/v1/${resources}`)
      .set('Authorization', `Bearer ${BAD_FORMAT_TOKEN}`)
      .send({});

    assert.unauthorizedError(result);
  });
};

export const deleteWithoutToken = (resource) => {
  test(`should not DELETE: /${resource} without-token`, async () => {
    const result = await chai.request(app).delete(`/api/v1/${resource}`);

    assert.unauthorizedError(result);
  });
};

export const deleteWithExpiredToken = (resource) => {
  test(`should not DELETE: /${resource} with expired token`, async () => {
    const result = await chai
      .request(app)
      .delete(`/api/v1/${resource}`)
      .set('Authorization', `Bearer ${EXPIRED_TOKEN}`);

    assert.unauthorizedError(result);
  });
};

export const deleteUsingTokenWithInvalidSignature = (resource) => {
  test(`should not DELETE: /${resource} using token with invalid signature`, async () => {
    const result = await chai
      .request(app)
      .delete(`/api/v1/${resource}`)
      .set('Authorization', `Bearer ${INVALID_SIGNATURE_TOKEN}`);

    assert.unauthorizedError(result);
  });
};

export const deleteMalformedToken = (resource) => {
  test(`should not DELETE: /${resource} with malformed token`, async () => {
    const result = await chai
      .request(app)
      .delete(`/api/v1/${resource}`)
      .set('Authorization', `Bearer ${MALFORMED_TOKEN}`);

    assert.unauthorizedError(result);
  });
};

export const deleteWithBadFormattedToken = (resources) => {
  test(`should not DELETE: /${resources} with bad-formatted token`, async () => {
    const result = await chai
      .request(app)
      .delete(`/api/v1/${resources}`)
      .set('Authorization', `Bearer ${BAD_FORMAT_TOKEN}`);

    assert.unauthorizedError(result);
  });
};
