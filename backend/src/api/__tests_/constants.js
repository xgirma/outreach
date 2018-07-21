// database
export const MONGO_ID = '5b1de7ac698c71055ef657f3';
export const BAD_MONGO_ID = '5b1de7ac698c71055ef657f33333';

// token
export const EXPIRED_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMWRlN2FjNjk4YzcxMDU1ZWY2NTdmMyIsImlhdCI6MTUyODY4NjUwOCwiZXhwIjoxNTMxMjc4NTA4fQ.-WKSkdvahV3aESbp1jR3yZ0iXisiJfPwuvV3jUHpMOo';
export const INVALID_SIGNATURE_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMWRlN2FjNjk4YzcxMDU1ZWY2NTdmMyIsImlhdCI6MTUyODY4NjUwOCwiZXhwIjoxNTMxMjc4NTA4fQ.-WKSkdvahV3aESbp1jR3yZ0iXisiJfPwuvV3jUHpM';
export const MALFORMED_TOKEN = 'MDU1ZWY2NTdmMyI';
export const BAD_FORMAT_TOKEN =
  'jwt Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMWRlN2FjNjk4YzcxMDU1ZWY2NTdmMyIsImlhdCI6MTUyODY4NjUwOCwiZXhwIjoxNTMxMjc4NTA4fQ.-WKSkdvahV3aESbp1jR3yZ0iXisiJfPwuvV3jUHpM';

// users
export const SUPER_ADMIN_LOGIN = {
  username: 'John.Doe',
  password: 's-A:XaW/3R'
};

export const SUPER_ADMIN_LOGIN_UPDATE = {
  currentPassword: "s-A:XaW/3R",
  newPassword: "q-W:QzA$3S",
  newPasswordAgain: "q-W:QzA$3S"
};

export const ADMIN_LOGIN = {
  username: 'Jane.Joe',
  password: 'p-B:GaY/3U'
};

export const ADMIN_LOGIN_UPDATE = {
  currentPassword: "p-B:GaY/3U",
  newPassword: "B-W:QzA$3S",
  newPasswordAgain: "B-W:QzA$3S"
};

export const SECOND_ADMIN_LOGIN = {
  username: 'Bob.Thomas',
  password: 't-E:SaD/3F',
};
