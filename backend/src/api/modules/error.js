const RESOURCE_NOT_FOUND =
  'The origin server did not find a current representation for the target resource or is not willing to disclose that one exists.';
const UNAUTHORIZED =
  'The request has not been applied because it lacks valid authentication credentials for the target resource.';
const BAD_REQUEST =
  'the server cannot or will not process the request due to something that is perceived to be a client error';

const BadRequest = (msg) => {
  const message = msg || BAD_REQUEST;
  const err = new Error(message);
  err.name = BadRequest.name;
  err.status = 400;
  return err;
};

const Unauthorized = (msg) => {
  const message = msg || UNAUTHORIZED;
  const err = new Error(message);
  err.name = Unauthorized.name;
  err.status = 401;
  return err;
};

const ResourceNotFound = (msg) => {
  const message = msg || RESOURCE_NOT_FOUND;
  const err = new Error(message);
  err.name = ResourceNotFound.name;
  err.status = 404;
  return err;
};

export { ResourceNotFound, Unauthorized, BadRequest };
