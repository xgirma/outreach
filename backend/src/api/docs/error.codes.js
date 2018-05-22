export const SERERR = {
  id: 5001,
  links: { about: 'https://tools.ietf.org/html/rfc7231#section-6.6.1' },
  status: 500,
  title: 'Unknown server error',
  code: 'SERERR',
  detail:
    'The 500 (Internal Server Error) status code indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.',
};
export const BADREQ = {
  id: 4001,
  links: { about: 'https://tools.ietf.org/html/rfc7231#section-6.5.1' },
  status: 400,
  code: 'BADREQ',
  title: 'Bad Request',
  detail:
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
  detail:
    'The origin server did not find a current representation for the target resource or is not willing to disclose that one exists.',
  source: { pointer: '', parameter: '' },
  meta: {},
};
