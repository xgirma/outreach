import faker from 'faker';

const churchService = () =>
  Object.assign({
    _id: 400,
    am: {
      title: faker.lorem.words(),
      description: faker.lorem.paragraphs(),
      author: faker.name.firstName(),
    },
    en: {
      title: faker.lorem.words(),
      description: faker.lorem.paragraphs(),
      author: faker.name.firstName(),
    },
    phone: faker.phone.phoneNumber(),
    email: faker.internet.email().toLowerCase(),
  });

export default churchService;
