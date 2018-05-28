/* eslint-disable no-underscore-dangle */
import createApiSpec from '../../../../helpers/apiSpecs';
import churchMedia from '../../../../helpers/faker/media';
import { Media } from './media.model';

const newResource = churchMedia();
newResource._id = 1000;
const params = {
  id: newResource._id,
};
const updateResource = churchMedia();
updateResource._id = 1000;

createApiSpec(Media, 'media', newResource, params, updateResource);
