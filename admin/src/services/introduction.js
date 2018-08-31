import { header, token, requester, poster } from '../helper';

const headers = { ...header, ...token };

export const getIntroductionService = async () => {
  const path = 'intro';
  const method = 'GET';
  return requester(path, method, headers);
};

export const deleteIntroductionService = async (id) => {
  const path = `intro/${id}`;
  const method = 'DELETE';
  return requester(path, method, headers);
};

export const updateIntroductionService = async (item) => {
  const { _id } = item;
  const path = `intro/${_id}`;
  const method = 'PUT';
  return poster(path, method, headers, item);
};

export const addIntroductionService = async (item) => {
  const path = 'intro';
  const method = 'POST';
  return poster(path, method, headers, item);
};
