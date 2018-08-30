import { header, token, requester, poster } from '../helper';

const headers = { ...header, ...token };

export const getInformationService = async () => {
  const path = 'info';
  const method = 'GET';
  return requester(path, method, headers);
};

export const deleteInformationService = async (id) => {
  const path = `info/${id}`;
  const method = 'DELETE';
  return requester(path, method, headers);
};

export const updateInformationService = async (item) => {
  const { _id } = item;
  const path = `info/${_id}`;
  const method = 'PUT';
  return poster(path, method, headers, item);
};

export const addInformationService = async (item) => {
  const path = 'info';
  const method = 'POST';
  return poster(path, method, headers, item);
};
