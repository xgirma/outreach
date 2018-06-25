import admin from './admin';
import blog from './blog';
import event from './event';
import info from './info';
import intro from './intro';
import media from './media';
import service from './service';

const password32 = '6Zu4G2TP6b9wEbEGDfkcLuH4fRmTHr4F';

export const model = {
  admin,
  blog,
  event,
  info,
  intro,
  media,
  service,
};
export const mongoId = '5b1de7ac698c71055ef657f3';
export const username = 'John.Doe';
export const strongPassword = 'p-U:QaA/3G';
export const weakPassword = 'knowledge';
export const weakPassPhrase = 'fox box red run';
export const shortPassword = 'pass';
export const longPassword = `${password32}${password32}${password32}${password32}6Zu4G2TP6b9wEbEGD`;
export const minPassword8 = 'p@$5WorD';
export const maxPassword128 = `${password32}${password32}${password32}${password32}`;
export const newPassword = 'q-W:QzA$3S';
export const newPasswordAgain = 'q-W:QzA$3S';
export const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMWRlN2FjNjk4YzcxMDU1ZWY2NTdmMyIsImlhdCI6MTUyODY4NjUwOCwiZXhwIjoxNTMxMjc4NTA4fQ.-WKSkdvahV3aESbp1jR3yZ0iXisiJfPwuvV3jUHpMOo';
