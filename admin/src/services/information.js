import { header, token, requester } from '../helper';

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
