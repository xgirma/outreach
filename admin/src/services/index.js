import {
  header, token, requester, poster, getId,
} from '../helper';

const headers = { ...header, ...token };

export const getService = async (resource) => {
  const path = resource;
  const method = 'GET';
  return requester(path, method, headers);
};

export const deleteService = async (resource, id) => {
  const path = `${resource}/${id}`;
  const method = 'DELETE';
  return requester(path, method, headers);
};

export const updateService = async (resource, item) => {
  let id;
  const hasIdProperty = Object.prototype.hasOwnProperty.call(item, '_id');
  if (hasIdProperty) {
    id = item._id;
  } else {
    id = getId();
  }
  const path = `${resource}/${id}`;
  const method = 'PUT';
  return poster(path, method, headers, item);
};

export const addService = async (resource, item) => {
  const path = resource;
  const method = 'POST';
  if (resource === 'signin') {
    return poster(path, method, header, item);
  }
  return poster(path, method, headers, item);
};
