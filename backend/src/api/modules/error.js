export const RESOURCE_NOT_FOUND =
  'the origin server did not find a current representation for the target resource or is not willing to disclose that one exists.';
export const UNAUTHORIZED =
  'the request has not been applied because it lacks valid authentication credentials for the target resource.';
const BAD_REQUEST =
  'the server cannot or will not process the request due to something that is perceived to be a client error';
export const FORBIDDEN =
  'the request has not been applied because it lacks valid authentication credentials for the target resource.';
const WEAK_PASSWORD = 'weak password based on the OWASP password strength test';

const WeakPassword = (msg = WEAK_PASSWORD) => {
  const err = new Error(msg);
  err.name = WeakPassword.name;
  err.status = 400;
  return err;
};

const BadRequest = (msg = BAD_REQUEST) => {
  const err = new Error(msg);
  err.name = BadRequest.name;
  err.status = 400;
  return err;
};

const Unauthorized = (msg = UNAUTHORIZED) => {
  const err = new Error(msg);
  err.name = Unauthorized.name;
  err.status = 401;
  return err;
};

const Forbidden = (msg = FORBIDDEN) => {
  const err = new Error(msg);
  err.name = Forbidden.name;
  err.status = 403;
  return err;
};

const NotFound = (msg = RESOURCE_NOT_FOUND) => {
  const err = new Error(msg);
  err.name = NotFound.name;
  err.status = 404;
  return err;
};

export { NotFound, Unauthorized, BadRequest, WeakPassword, Forbidden };
