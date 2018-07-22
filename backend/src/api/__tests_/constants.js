import faker from 'faker';

const passwordPart = '6Zu4G2TP6b9wEbEGDfkcLuH4fRmTHr4F';
const longPassword = `${passwordPart}${passwordPart}${passwordPart}${passwordPart}6Zu4G2TP6b9wEbEGD`;
const weakPassword = 'knowledge';
const weakPassPhrase = 'fox box red run';
const shortPassword = 'pass';
const goodUsername = 'Sam.Ethon';
const goodPassword = 'o-Y:SaM/4W';
const badUsername = 'bad.username';
const badPassword = 'bad.password';

/**
 * DATABASE
 */
export const MONGO_ID = '5b1de7ac698c71055ef657f3';
export const BAD_MONGO_ID = '5b1de7ac698c71055ef657f33333';

/**
 * TOKEN
 */
export const EXPIRED_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMWRlN2FjNjk4YzcxMDU1ZWY2NTdmMyIsImlhdCI6MTUyODY4NjUwOCwiZXhwIjoxNTMxMjc4NTA4fQ.-WKSkdvahV3aESbp1jR3yZ0iXisiJfPwuvV3jUHpMOo';
export const INVALID_SIGNATURE_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMWRlN2FjNjk4YzcxMDU1ZWY2NTdmMyIsImlhdCI6MTUyODY4NjUwOCwiZXhwIjoxNTMxMjc4NTA4fQ.-WKSkdvahV3aESbp1jR3yZ0iXisiJfPwuvV3jUHpM';
export const MALFORMED_TOKEN = 'MDU1ZWY2NTdmMyI';
export const BAD_FORMAT_TOKEN =
  'jwt Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMWRlN2FjNjk4YzcxMDU1ZWY2NTdmMyIsImlhdCI6MTUyODY4NjUwOCwiZXhwIjoxNTMxMjc4NTA4fQ.-WKSkdvahV3aESbp1jR3yZ0iXisiJfPwuvV3jUHpM';

/**
 * USERS
 */
export const SUPER_ADMIN_LOGIN = {
  username: 'John.Doe',
  password: 's-A:XaW/3R',
};

export const SUPER_ADMIN_LOGIN_UPDATE = {
  currentPassword: 's-A:XaW/3R',
  newPassword: 'o-Y:SaM/4W',
  newPasswordAgain: 'o-Y:SaM/4W',
};

export const SUPER_ADMIN_LOGIN_AFTER_UPDATE = {
  username: 'John.Doe',
  password: 'o-Y:SaM/4W',
};

export const SUPER_ADMIN_UPDATE_WITH_NEW_SHORT_PASSWORD = {
  currentPassword: 's-A:XaW/3R',
  newPassword: shortPassword,
  newPasswordAgain: shortPassword,
};

export const SUPER_ADMIN_UPDATE_WITH_LONG_PASSWORD = {
  currentPassword: 's-A:XaW/3R',
  newPassword: longPassword,
  newPasswordAgain: longPassword,
};

export const SUPER_ADMIN_UPDATE_WITH_WEAK_PASSWORD = {
  currentPassword: 's-A:XaW/3R',
  newPassword: weakPassword,
  newPasswordAgain: weakPassword,
};

export const SUPER_ADMIN_UPDATE_WITH_WEAK_PASS_PHRASE = {
  currentPassword: 's-A:XaW/3R',
  newPassword: weakPassPhrase,
  newPasswordAgain: weakPassPhrase,
};

export const SUPER_ADMIN_UPDATE_NEW_PASS_DO_NON_MATCH = {
  currentPassword: 's-A:XaW/3R',
  newPassword: 'q-W:QzA$3Sa',
  newPasswordAgain: 'q-W:QzA$3Ss',
};

export const SUPER_ADMIN_SAME_NEW_AND_CURRENT_PASSWORD = {
  currentPassword: 's-A:XaW/3R',
  newPassword: 's-A:XaW/3R',
  newPasswordAgain: 's-A:XaW/3R',
};

export const SUPER_ADMIN_WRONG_CURRENT_CURRENT_PASSWORD = {
  currentPassword: 's-A:XaW/3RR',
  newPassword: goodPassword,
  newPasswordAgain: goodPassword,
};

export const ADMIN_LOGIN = {
  username: 'Jane.Joe',
};

export const ADMIN_LOGIN_UPDATE = {
  newPassword: 'B-W:QzA$3S',
  newPasswordAgain: 'B-W:QzA$3S',
};

export const SECOND_ADMIN_LOGIN = {
  username: 'Bob.Thomas',
};

export const ADMIN_SHORT_PASSWORD = {
  username: faker.internet.userName(),
  password: shortPassword,
};

export const ADMIN_LONG_PASSWORD = {
  username: faker.internet.userName(),
  password: longPassword,
};

export const ADMIN_WEAK_PASSWORD = {
  username: faker.internet.userName(),
  password: weakPassword,
};

export const ADMIN_WEAK_PASS_PHRASE = {
  username: faker.internet.userName(),
  password: weakPassPhrase,
};

/**
 * SIGNIN
 */
export const SIGNIN_BAD_USERNAME = {
  username: badUsername,
  password: goodPassword,
};

export const SIGNIN_BAD_PASSWORD = {
  username: goodUsername,
  password: badPassword,
};

export const SIGNIN_BAD_USERNAME_AND_PASSWORD = {
  username: badUsername,
  password: badPassword,
};

/**
 * ERROR
 */
export const WEAK_PASSWORD_ERRORS = [
  'The password must contain at least one uppercase letter.',
  'The password must contain at least one number.',
  'The password must contain at least one special character.',
];

export const UNAUTHORIZED_ERROR = [
  'No authorization token was found',
  'jwt expired',
  'invalid signature',
  'jwt malformed',
  'Format is Authorization: Bearer [token]',
];
