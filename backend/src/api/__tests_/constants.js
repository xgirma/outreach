/**
 * database
 */
export const MONGO_ID = '5b1de7ac698c71055ef657f3';
export const BAD_MONGO_ID = '5b1de7ac698c71055ef657f33333';

/**
 * token
 */
export const EXPIRED_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMWRlN2FjNjk4YzcxMDU1ZWY2NTdmMyIsImlhdCI6MTUyODY4NjUwOCwiZXhwIjoxNTMxMjc4NTA4fQ.-WKSkdvahV3aESbp1jR3yZ0iXisiJfPwuvV3jUHpMOo';
export const INVALID_SIGNATURE_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMWRlN2FjNjk4YzcxMDU1ZWY2NTdmMyIsImlhdCI6MTUyODY4NjUwOCwiZXhwIjoxNTMxMjc4NTA4fQ.-WKSkdvahV3aESbp1jR3yZ0iXisiJfPwuvV3jUHpM';
export const MALFORMED_TOKEN = 'MDU1ZWY2NTdmMyI';
export const BAD_FORMAT_TOKEN =
  'jwt Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMWRlN2FjNjk4YzcxMDU1ZWY2NTdmMyIsImlhdCI6MTUyODY4NjUwOCwiZXhwIjoxNTMxMjc4NTA4fQ.-WKSkdvahV3aESbp1jR3yZ0iXisiJfPwuvV3jUHpM';

/**
 * user
 */
const part = '6Zu4G2TP6b9wEbEGDfkcLuH4fRmTHr4F';
export const password = {
  SHORT: 'pass',
  WEAK: 'knowledge',
  WEAK_PASS_PHRASE: 'red fox run fast',
  LONG: `${part}${part}${part}${part}6Zu4G2TP6b9wEbEGD`,
  STRONG: 'o-Y:SaM/4W',
  NEW: 'q-W:QzA$3Ss',
};

export const username = {
  SUPER_ADMIN: 'John.Doe',
  ADMIN: 'Jane.Doe',
  ADMIN_ASSISTANT: 'Johnny Doe',
};

/**
 * error
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
