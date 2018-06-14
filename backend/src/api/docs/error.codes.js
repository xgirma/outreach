export const SERERR = {
  title: 'Unknown server error',
  message:
    'The 500 (Internal Server Error) status code indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.',
};

export const MCOERR = {
  title: 'Mongo connection error',
  message:
    'The database server encountered an unexpected condition that prevented it from fulfilling the request.',
  source: { pointer: '', parameter: '' },
};

export const BADREQ = {
  title: 'Bad Request',
  message:
    'The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).',
};

export const NOTFUD = {
  title: 'Resource not found.',
  message:
    'The origin server did not find a current representation for the target resource or is not willing to disclose that one exists.',
};

export const MDUERR = {
  title: 'Mongo duplicate key error',
  message:
    'The operation fails to insert the document because of the violation of the unique constraint on the value of the field.',
};

export const AUTERR = {
  title: 'Unauthorized',
  message:
    'The request has not been applied because it lacks valid authentication credentials for the target resource.',
};
