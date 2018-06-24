import faker from 'faker';

const adminUser = () =>
  Object.assign({
    username: faker.internet.userName(),
    password: faker.internet.password(),
  });
export default adminUser;
