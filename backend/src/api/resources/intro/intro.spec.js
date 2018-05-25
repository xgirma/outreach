/* eslint-disable no-underscore-dangle */
import createApiSpec from '../../../helpers/apiSpecs';
import churchIntro from '../../../helpers/faker.intro';
import { Intro } from './intro.model';

const newResource = churchIntro();
newResource._id = 1000;
const params = {
  id: newResource._id,
};
const updateResource = churchIntro();
updateResource._id = 1000;

createApiSpec(Intro, 'intro', newResource, params, updateResource);
