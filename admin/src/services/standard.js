import { header, token, requester, poster } from '../helper';

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
  const { _id } = item;
  const path = `${resource}/${_id}`;
  const method = 'PUT';
  return poster(path, method, headers, item);
};

export const addService = async (resource, item) => {
  const path = resource;
  const method = 'POST';
  return poster(path, method, headers, item);
};