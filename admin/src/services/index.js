import { requester, poster, getId, getToken } from '../helper';

const header = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const headers = () => {
  const token = getToken();
  return { ...header, Authorization: `Bearer ${token}`}
};

export const getService = (resource) => {
  const path = resource;
  const method = 'GET';
  return requester(path, method, headers());
};

export const deleteService = (resource, id) => {
  const path = `${resource}/${id}`;
  const method = 'DELETE';
  return requester(path, method, headers());
};

export const updateService = (resource, item) => {
  let id;
  const hasIdProperty = Object.prototype.hasOwnProperty.call(item, '_id');
  if (hasIdProperty) {
    id = item._id;
  } else {
    id = getId();
  }
  const path = `${resource}/${id}`;
  const method = 'PUT';
  return poster(path, method, headers(), item);
};

export const addService = (resource, item) => {
  const path = resource;
  const method = 'POST';
  if (resource === 'signin') {
    return poster(path, method, header, item);
  }
  return poster(path, method, headers(), item);
};
