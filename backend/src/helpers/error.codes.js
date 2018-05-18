export const SAVERR = {
  id: 1000,
  links: { about: 'http://mongoosejs.com/docs/api.html#model_Model-save' },
  status: 422,
  code: 'DBSAVEERR',
  title: 'Mongoose save error',
  detail:
    'The 422 (Unprocessable Entity) status code means the server\n' +
    '   understands the content type of the request entity (hence a\n' +
    '   415(Unsupported Media Type) status code is inappropriate), and the\n' +
    '   syntax of the request entity is correct (thus a 400 (Bad Request)\n' +
    '   status code is inappropriate) but was unable to process the contained\n' +
    '   instructions.  For example, this error condition may occur if an XML\n' +
    '   request body contains well-formed (i.e., syntactically correct), but\n' +
    '   semantically erroneous, XML instructions. [R] Probably schema validation error',
  source: { pointer: '', parameter: '' },
  meta: {},
};

export const SERERR = {
  id: 1001,
  status: 500,
  title: 'Unknown server error',
  code: 'SERVERERR',
  detail:
    'The 500 (Internal Server Error) status code indicates that the server\n' +
    '   encountered an unexpected condition that prevented it from fulfilling\n' +
    '   the request.',
};
export const BADREQ = {
  id: 1002,
  links: { about: '' },
  status: 400,
  code: 'BADREQERR',
  title: 'Bad Request',
  detail:
    'The 400 (Bad Request) status code indicates that the server cannot or\n' +
    '   will not process the request due to something that is perceived to be\n' +
    '   a client error (e.g., malformed request syntax, invalid request\n' +
    '   message framing, or deceptive request routing). [R] Probably schema validation error',
  source: { pointer: '', parameter: '' },
  meta: {},
};

// for documentation only
export const TEMPLATE = {
  id: '',
  links: { about: 'http://jsonapi.org/format/#error-objects' },
  status: '',
  code: '',
  title: '!!!!  warning !!!!',
  detail: 'Do not use this, it is a template',
  source: { pointer: '', parameter: '' },
  meta: {},
};
