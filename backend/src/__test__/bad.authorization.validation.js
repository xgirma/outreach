import chai from 'chai';
import dotenv from 'dotenv';
import * as assert from './response.validation';
import { expiredToken, invalidSignatureToken, malformedToken, badFormatToken } from './helper';

dotenv.config();
const baseUrl = process.env.BACKEND_URL;

export const getWithoutToken = (resource) => {
  test('401 - UnauthorizedError - No authorization token was found', async () => {
    const result = await chai.request(baseUrl).get(`/api/v1/${resource}`);
    assert.unauthorizedError(result);
  });
};

export const getWithExpiredToken = (resource) => {
  test('401 - UnauthorizedError - jwt expired', async () => {
    const result = await chai
      .request(baseUrl)
      .get(`/api/v1/${resource}`)
      .set('Authorization', `Bearer ${expiredToken}`);

    assert.unauthorizedError(result);
  });
};

export const getUsingTokenWithInvalidSignature = (resource) => {
  test('401 - UnauthorizedError - invalid signature', async () => {
    const result = await chai
      .request(baseUrl)
      .get(`/api/v1/${resource}`)
      .set('Authorization', `Bearer ${invalidSignatureToken}`);

    assert.unauthorizedError(result);
  });
};

export const getMalformedToken = (resource) => {
  test('401 - UnauthorizedError - jwt malformed', async () => {
    const result = await chai
      .request(baseUrl)
      .get(`/api/v1/${resource}`)
      .set('Authorization', `Bearer ${malformedToken}`);

    assert.unauthorizedError(result);
  });
};

export const getWithBadFormattedToken = (resources) => {
  test('401 - UnauthorizedError - Format is Authorization: Bearer [token]', async () => {
    const result = await chai
      .request(baseUrl)
      .get(`/api/v1/${resources}`)
      .set('Authorization', `Bearer ${badFormatToken}`);

    assert.unauthorizedError(result);
  });
};

export const postWithoutToken = (resource) => {
  test('401 - UnauthorizedError - No authorization token was found', async () => {
    const result = await chai
      .request(baseUrl)
      .post(`/api/v1/${resource}`)
      .send({});

    assert.unauthorizedError(result);
  });
};

export const postWithExpiredToken = (resource) => {
  test('401 - UnauthorizedError - jwt expired', async () => {
    const result = await chai
      .request(baseUrl)
      .post(`/api/v1/${resource}`)
      .set('Authorization', `Bearer ${expiredToken}`)
      .send({});

    assert.unauthorizedError(result);
  });
};

export const postUsingTokenWithInvalidSignature = (resource) => {
  test('401 - UnauthorizedError - invalid signature', async () => {
    const result = await chai
      .request(baseUrl)
      .post(`/api/v1/${resource}`)
      .set('Authorization', `Bearer ${invalidSignatureToken}`)
      .send({});

    assert.unauthorizedError(result);
  });
};

export const postMalformedToken = (resource) => {
  test('401 - UnauthorizedError - jwt malformed', async () => {
    const result = await chai
      .request(baseUrl)
      .post(`/api/v1/${resource}`)
      .set('Authorization', `Bearer ${malformedToken}`)
      .send({});

    assert.unauthorizedError(result);
  });
};

export const postWithBadFormattedToken = (resources) => {
  test('401 - UnauthorizedError - Format is Authorization: Bearer [token]', async () => {
    const result = await chai
      .request(baseUrl)
      .post(`/api/v1/${resources}`)
      .set('Authorization', `Bearer ${badFormatToken}`)
      .send({});

    assert.unauthorizedError(result);
  });
};

export const putWithoutToken = (resource) => {
  test('401 - UnauthorizedError - No authorization token was found', async () => {
    const result = await chai
      .request(baseUrl)
      .get(`/api/v1/${resource}`)
      .send({});

    assert.unauthorizedError(result);
  });
};

export const putWithExpiredToken = (resource) => {
  test('401 - UnauthorizedError - jwt expired', async () => {
    const result = await chai
      .request(baseUrl)
      .post(`/api/v1/${resource}`)
      .set('Authorization', `Bearer ${expiredToken}`)
      .send({});

    assert.unauthorizedError(result);
  });
};

export const putUsingTokenWithInvalidSignature = (resource) => {
  test('401 - UnauthorizedError - invalid signature', async () => {
    const result = await chai
      .request(baseUrl)
      .put(`/api/v1/${resource}`)
      .set('Authorization', `Bearer ${invalidSignatureToken}`)
      .send({});

    assert.unauthorizedError(result);
  });
};

export const putMalformedToken = (resource) => {
  test('401 - UnauthorizedError - jwt malformed', async () => {
    const result = await chai
      .request(baseUrl)
      .put(`/api/v1/${resource}`)
      .set('Authorization', `Bearer ${malformedToken}`)
      .send({});

    assert.unauthorizedError(result);
  });
};

export const putWithBadFormattedToken = (resources) => {
  test('401 - UnauthorizedError - Format is Authorization: Bearer [token]', async () => {
    const result = await chai
      .request(baseUrl)
      .put(`/api/v1/${resources}`)
      .set('Authorization', `Bearer ${badFormatToken}`)
      .send({});

    assert.unauthorizedError(result);
  });
};

export const deleteWithoutToken = (resource) => {
  test('401 - UnauthorizedError - No authorization token was found', async () => {
    const result = await chai.request(baseUrl).delete(`/api/v1/${resource}`);

    assert.unauthorizedError(result);
  });
};

export const deleteWithExpiredToken = (resource) => {
  test('401 - UnauthorizedError - jwt expired', async () => {
    const result = await chai
      .request(baseUrl)
      .delete(`/api/v1/${resource}`)
      .set('Authorization', `Bearer ${expiredToken}`);

    assert.unauthorizedError(result);
  });
};

export const deleteUsingTokenWithInvalidSignature = (resource) => {
  test('401 - UnauthorizedError - invalid signature', async () => {
    const result = await chai
      .request(baseUrl)
      .delete(`/api/v1/${resource}`)
      .set('Authorization', `Bearer ${invalidSignatureToken}`);

    assert.unauthorizedError(result);
  });
};

export const deleteMalformedToken = (resource) => {
  test('401 - UnauthorizedError - jwt malformed', async () => {
    const result = await chai
      .request(baseUrl)
      .delete(`/api/v1/${resource}`)
      .set('Authorization', `Bearer ${malformedToken}`);

    assert.unauthorizedError(result);
  });
};

export const deleteWithBadFormattedToken = (resources) => {
  test('401 - UnauthorizedError - Format is Authorization: Bearer [token]', async () => {
    const result = await chai
      .request(baseUrl)
      .delete(`/api/v1/${resources}`)
      .set('Authorization', `Bearer ${badFormatToken}`);

    assert.unauthorizedError(result);
  });
};
