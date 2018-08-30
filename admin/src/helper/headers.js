import { getToken } from './authentication';

export const header = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

export const token = {
  'Authorization':`Bearer ${getToken()}`
};
