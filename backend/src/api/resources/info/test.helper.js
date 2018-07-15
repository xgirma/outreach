import { expect } from 'chai';
import * as common from '../../../../helpers/faker';

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
