import faker from 'faker';

const churchInfo = () => {
  return Object.assign({
    _id: 2,
    am: {
      name: faker.lorem.words,
      denomination: faker.lorem.words,
      phone: faker.phone.phoneNumber,
      address: {
        street: faker.address.streetAddress,
        city: faker.address.city,
        state: faker.address.state,
        zip: faker.address.zipCode,
        country: faker.address.country
      },
      bible: {
        verse: faker.lorem.sentence,
        from: faker.lorem.words
      }
    },
    en: {
      name: faker.lorem.words,
      denomination: faker.lorem.words,
      phone: faker.phone.phoneNumber,
      address: {
        street: faker.address.streetAddress,
        city: faker.address.city,
        state: faker.address.state,
        zip: faker.address.zipCode,
        country: faker.address.country
      },
      bible: {
        verse: faker.lorem.sentence,
        from: faker.lorem.words
      }
    }
  });
};

export { churchInfo };
