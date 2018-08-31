import { header, token, requester, poster } from '../helper';

const headers = { ...header, ...token };

export const getEventService = async () => {
  const path = 'info';
  const method = 'GET';
  return requester(path, method, headers);
};

export const deleteEventService = async (id) => {
  const path = `info/${id}`;
  const method = 'DELETE';
  return requester(path, method, headers);
};

export const updateEventService = async (item) => {
  const { _id } = item;
  const path = `info/${_id}`;
  const method = 'PUT';
  return poster(path, method, headers, item);
};

export const addEventService = async (item) => {
  const path = 'info';
  const method = 'POST';
  return poster(path, method, headers, item);
};
