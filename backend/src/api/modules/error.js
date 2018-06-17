const RESOURCE_NOT_FOUND =
  'The origin server did not find a current representation for the target resource or is not willing to disclose that one exists.';
const UNAUTHORIZED =
  'The request has not been applied because it lacks valid authentication credentials for the target resource.';

const ResourceNotFound = (msg) => {
  const message = msg || RESOURCE_NOT_FOUND;
  const resourceNotFound = new Error(message);
  resourceNotFound.name = ResourceNotFound.name;
  return resourceNotFound;
};

const Unauthorized = (msg) => {
  const message = msg || UNAUTHORIZED;
  const unauthorized = new Error(message);
  unauthorized.name = Unauthorized.name;
  return unauthorized;
};

export { ResourceNotFound, Unauthorized };
