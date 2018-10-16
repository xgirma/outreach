/* eslint-disable consistent-return */
import { expect } from 'chai';
import isEmpty from 'lodash.isempty';
import mongoose from 'mongoose';

export const testEmptySuccess = (data) => expect(isEmpty(data)).to.be.true;

export const testNonEmpty = (data) => expect(isEmpty(data)).to.be.false;

export const jsonContent = (result) => {
  expect(result).to.have.header('content-type', 'application/json; charset=utf-8');
};

export const unauthorizedErrors = [
  'No authorization token was found',
  'jwt expired',
  'invalid signature',
  'jwt malformed',
  'Format is Authorization: Bearer [token]',
];

export const expiredToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMWRlN2FjNjk4YzcxMDU1ZWY2NTdmMyIsImlhdCI6MTUyODY4NjUwOCwiZXhwIjoxNTMxMjc4NTA4fQ.-WKSkdvahV3aESbp1jR3yZ0iXisiJfPwuvV3jUHpMOo';

export const invalidSignatureToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMWRlN2FjNjk4YzcxMDU1ZWY2NTdmMyIsImlhdCI6MTUyODY4NjUwOCwiZXhwIjoxNTMxMjc4NTA4fQ.-WKSkdvahV3aESbp1jR3yZ0iXisiJfPwuvV3jUHpM';

export const malformedToken = 'MDU1ZWY2NTdmMyI';

export const badFormatToken =
  'jwt Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMWRlN2FjNjk4YzcxMDU1ZWY2NTdmMyIsImlhdCI6MTUyODY4NjUwOCwiZXhwIjoxNTMxMjc4NTA4fQ.-WKSkdvahV3aESbp1jR3yZ0iXisiJfPwuvV3jUHpM';

export const mongoId = '5b1de7ac698c71055ef657f3';

export const badMongoId = '5b1de7ac698c71055ef657f33333';

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);

export const dropDatabase = () =>
  mongoose.connect(process.env.MONGODB_URL).then(() =>
    Promise.all(
      mongoose.modelNames().map((modelName) => {
        const Model = mongoose.model(modelName);
        return new Promise((resolve, reject) => {
          if (!Model) {
            return resolve();
          }
          Model.remove((err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
      }),
    ),
  );

export const username = {
  SUPER_ADMIN: 'John.Doe',
  ADMIN: 'Jane.Doe',
  ADMIN_ASSISTANT: 'Johnny Doe',
};

const part = '6Zu4G2TP6b9wEbEGDfkcLuH4fRmTHr4F';
export const password = {
  SHORT: 'pass',
  WEAK: 'knowledge',
  WEAK_PASS_PHRASE: 'red fox run fast',
  LONG: `${part}${part}${part}${part}6Zu4G2TP6b9wEbEGD`,
  STRONG: 'o-Y:SaM/4W',
  NEW: 'q-W:QzA$3Ss',
  NUMERIC: '123456789',
};

export const weakPasswordErrors = [
  'The password must contain at least one uppercase letter.',
  'The password must contain at least one number.',
  'The password must contain at least one special character.',
];

// prettier-ignore
export const falsy = [false, null, undefined, 0, NaN, '', ""];
