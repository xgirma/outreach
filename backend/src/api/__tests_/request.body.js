import faker from 'faker';
import { generate } from 'generate-password';
import { passwordConfig } from '../modules/password';

export const admin = Object.assign({
  username: faker.internet.userName(),
  password: generate({ ...passwordConfig }),
});

export const info = {
  sl: {
    name: faker.lorem.words(),
    denomination: faker.lorem.words(),
    bible: {
      verse: faker.lorem.sentence(),
      from: faker.lorem.words(),
    },
  },
  en: {
    name: faker.lorem.words(),
    denomination: faker.lorem.words(),
    bible: {
      verse: faker.lorem.sentence(),
      from: faker.lorem.words(),
    },
  },
  phone: faker.phone.phoneNumber(),
  email: faker.internet.email().toLowerCase(),
  address: {
    street: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    zip: faker.address.zipCode(),
    country: faker.address.country(),
  },
};

export const event = {
  am: {
    title: faker.lorem.words(),
    description: faker.lorem.paragraphs(),
  },
  en: {
    title: faker.lorem.words(),
    description: faker.lorem.paragraphs(),
  },
  address: {
    street: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    zip: faker.address.zipCode(),
    country: faker.address.country(),
  },
  email: faker.internet.email().toLowerCase(),
  phone: faker.phone.phoneNumber(),
  dateStart: '2028-07-22T05:19:15.932Z',
  dateEnd: '2028-12-22T05:19:15.932Z',
};

export const services = {
  am: {
    title: faker.lorem.words(),
    description: faker.lorem.paragraphs(),
    contact: faker.name.findName(),
  },
  en: {
    title: faker.lorem.words(),
    description: faker.lorem.paragraphs(),
    contact: faker.name.findName(),
  },
  phone: faker.phone.phoneNumber(),
  email: faker.internet.email().toLowerCase(),
};

export const blog = {
  am: {
    title: faker.lorem.words(),
    description: faker.lorem.paragraphs(),
  },
  en: {
    title: faker.lorem.words(),
    description: faker.lorem.paragraphs(),
  },
  author: faker.name.findName(),
  dateStart: faker.date.future(2),
  tag: faker.hacker.noun(),
};

export const media = Object.assign({
  am: { body: faker.lorem.paragraphs() },
  en: { body: faker.lorem.paragraphs() },
  title: faker.lorem.words(),
  url: faker.internet.url(),
  mediaType: 'video',
  tag: faker.hacker.noun(),
});
