import faker from 'faker';

const churchService = () =>
  Object.assign({
    _id: 400,
    am: {
      title: faker.lorem.words(),
      date: faker.date.recent(),
      author: faker.name.firstName(),
      intro: faker.lorem.paragraphs(),
    },
    en: {
      title: faker.lorem.words(),
      date: faker.date.recent(),
      author: faker.name.firstName(),
      intro: faker.lorem.paragraphs(),
    },
  });

export default churchService;
