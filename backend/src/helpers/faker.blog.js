import faker from 'faker';

const churchBlog = () =>
  Object.assign({
    _id: 202020,
    am: {
      title: faker.lorem.words(),
      body: faker.lorem.paragraphs(),
    },
    en: {
      title: faker.lorem.words(),
      body: faker.lorem.paragraphs(),
    },
    author: faker.lorem.words(),
    date_start: faker.date.recent(),
    tag: faker.lorem.words(),
  });

export default churchBlog;
