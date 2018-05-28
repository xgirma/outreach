import faker from 'faker';

const churchInfo = () =>
  Object.assign({
    _id: 20,
    am: {
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
  });

export default churchInfo;
