import faker from 'faker';

const churchIntro = () =>
  Object.assign({
    _id: 200,
    am: {
      title: faker.lorem.words(),
      date: Date.now(),
      author: faker.name.firstName(),
      intro: faker.lorem.paragraphs(),
    },
    en: {
      title: faker.lorem.words(),
      date: Date.now(),
      author: faker.name.firstName(),
      intro: faker.lorem.paragraphs(),
    },
  });

export default churchIntro;
