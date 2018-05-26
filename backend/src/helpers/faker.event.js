import faker from 'faker';

const churchEvent = () =>
  Object.assign({
    _id: 202020,
    am: {
      title: faker.lorem.words(),
      date: {
        from: faker.date.recent(),
        to: faker.date.future(),
      },
      description: faker.lorem.paragraphs(),
      address: {
        street: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        zip: faker.address.zipCode(),
        country: faker.address.country(),
      },
      phone: faker.phone.phoneNumber(),
      email: faker.internet.email().toLowerCase(),
    },
    en: {
      title: faker.lorem.words(),
      date: {
        from: faker.date.recent(),
        to: faker.date.future(),
      },
      description: faker.lorem.paragraphs(),
      address: {
        street: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        zip: faker.address.zipCode(),
        country: faker.address.country(),
      },
      phone: faker.phone.phoneNumber(),
      email: faker.internet.email().toLowerCase(),
    },
  });

export default churchEvent;
