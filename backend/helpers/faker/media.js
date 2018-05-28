import faker from 'faker';

const churchIntro = () =>
  Object.assign({
    _id: 400,
    am: {
      body: faker.lorem.paragraphs(),
    },
    en: {
      body: faker.lorem.paragraphs(),
    },
    title: faker.lorem.words(),
    url: 'https://youtu.be/L42pEhb6NGY',
    media_type: 'video',
    tag: 'song',
  });

export default churchIntro;
