/* eslint-disable no-underscore-dangle */
import createApiSpec from '../../../../helpers/apiSpecs';
import churchInfo from '../../../../helpers/faker/info';
import { Info } from './info.model';

const newResource = churchInfo();
newResource._id = 1000;
const params = {
  id: newResource._id,
};
const updateResource = churchInfo();
updateResource._id = 1000;

createApiSpec(Info, 'info', newResource, params, updateResource);
