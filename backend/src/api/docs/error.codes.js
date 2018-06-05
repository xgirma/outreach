export const SERERR = {
  id: 5001,
  links: { about: 'https://tools.ietf.org/html/rfc7231#section-6.6.1' },
  status: 500,
  title: 'Unknown server error',
  code: 'SERERR',
  message:
    'The 500 (Internal Server Error) status code indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.',
};

export const MCOERR = {
  id: 5002,
  links: { about: 'http://mongoosejs.com/docs/connections.html' },
  status: 500,
  code: 'MCOERR',
  title: 'Mongo connection error',
  message:
    'The database server encountered an unexpected condition that prevented it from fulfilling the request.',
  source: { pointer: '', parameter: '' },
  meta: {},
};

export const BADREQ = {
  id: 4001,
  links: { about: 'https://tools.ietf.org/html/rfc7231#section-6.5.1' },
  status: 400,
  code: 'BADREQ',
  title: 'Bad Request',
  message:
    'The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).',
  source: { pointer: '', parameter: '' },
  meta: {},
};

export const NOTFUD = {
  id: 4002,
  links: { about: 'https://tools.ietf.org/html/rfc7231#section-6.5.4' },
  status: 404,
  code: 'NOTFUD',
  title: 'Resource not found.',
  message:
    'The origin server did not find a current representation for the target resource or is not willing to disclose that one exists.',
  source: { pointer: '', parameter: '' },
  meta: {},
};

export const MDUERR = {
  id: 4003,
  links: {
    about: 'https://docs.mongodb.com/manual/core/index-unique/#unique-index-and-missing-field',
  },
  status: 400,
  code: 'MDUERR',
  title: 'Mongo duplicate key error',
  message:
    'The operation fails to insert the document because of the violation of the unique constraint on the value of the field.',
  source: { pointer: '', parameter: '' },
  meta: {},
};

export const AUTERR = {
  id: 4004,
  links: {
    about: 'https://tools.ietf.org/html/rfc7235#section-3.1',
  },
  status: 401,
  code: 'AUTERR',
  title: 'Unauthorized',
  message:
    'The request has not been applied because it lacks valid authentication credentials for the target resource.',
  source: { pointer: '', parameter: '' },
  meta: {},
};
