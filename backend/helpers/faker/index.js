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

// mongoID
export const mongoId = '5b1de7ac698c71055ef657f3';
export const invalidMongoId = '5b1de7ac698c71055ef657f33333';

// super admin
export const username = 'John.Doe'; // super-admin-username
export const password = 's-A:XaW/3R'; // super-admin-password
export const passwordNew = 'o-Y:SaM/4W'; // super-admin--updated password

// admin
export const adminUsername = 'Joan.Joe';
export const adminPassword = 'p-B:GaY/3U';

// admin 2
export const adminUsernameSecond = 'Bob.Thomas';
export const adminPasswordSecond = 't-E:SaD/3F';

// weak password
export const weakPassword = 'knowledge';
export const weakPassPhrase = 'fox box red run';
export const shortPassword = 'pass';

// strong password
export const strongPassword = 'p-U:QaA/3G';
export const strongPassPhrase = 'correct horse battery staple';
export const longPassword = `${password32}${password32}${password32}${password32}6Zu4G2TP6b9wEbEGD`;

// 8(min) and 128(max) passwords
export const minPassword8 = 'p@$5WorD';
export const maxPassword128 = `${password32}${password32}${password32}${password32}`;

// matching new passwords
export const newPassword = 'q-W:QzA$3S';
export const newPasswordAgain = 'q-W:QzA$3S';

// invalid token
export const badToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMWRlN2FjNjk4YzcxMDU1ZWY2NTdmMyIsImlhdCI6MTUyODY4NjUwOCwiZXhwIjoxNTMxMjc4NTA4fQ.-WKSkdvahV3aESbp1jR3yZ0iXisiJfPwuvV3jUHpMOo';
