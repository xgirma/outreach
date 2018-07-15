import { expect } from 'chai';
import faker from 'faker';
import isEmpty from 'lodash.isempty';
import * as err from '../../modules/error';
import * as common from '../../../../helpers/faker';

/*
 * gets all admin for supper-admin or gets the requesting admin
 *
 * @param result: http response
 * @param all: (boolean)
 *    true: get all admins
 *    false: get one admin by id
 */
export const getAdmin = (result, all = true) => {
  const { status, data } = result.body;
  const { admins } = data;

  expect(result).to.have.status(200);
  expect(status).to.equal('success');

  if (all) {
    expect(admins.length).to.be.greaterThan(1);
  } else {
    expect(isEmpty(admins)).to.equal(false); // not array
  }
};

// admin
export const supperAdminCredential = {
  username: common.username,
  password: common.password,
};

export const churchInfo = {
  am: {
    name: 'ቅዱስ ጊዮርጊስ የኢትዮጵያ ኦርቶዶክስ ተዋህዶ ቤተክርስቲያን',
    denomination: 'የኢትዮጵያ ኦርቶዶክስ ተዋህዶ ቤተክርስቲያን',
    bible: {
      verse: 'እኔም እልሃለሁ: አንተ ጴጥሮስ ነህ: በዚችም ዓለት ላይ ቤተ ክርስቲያኔን እሠራለሁ: የገሃነም ደጆችም አይችሉአትም::',
      from: 'Matthew 16:18',
    },
  },
  en: {
    name: 'St. George Ethiopian Orthodox Tewahedo Church',
    denomination: 'Ethiopian Orthodox Tewahedo Church',
    bible: {
      verse:
        'And I tell you that you are Peter,and on this rock I will build my church, and the gates of Hadeswill not overcome it.',
      from: 'Matthew 16:18',
    },
  },
  phone: '(425) 329 - 9092',
  email: 'info@gedam.org',
  address: {
    street: '1234 EastLake Ave East',
    city: 'Seattle',
    state: 'WA',
    zip: '98201',
    country: 'United States',
  },
};
