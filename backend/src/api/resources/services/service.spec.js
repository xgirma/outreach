/* eslint-disable no-underscore-dangle */
import createApiSpec from '../../../../helpers/apiSpecs';
import churchService from '../../../../helpers/faker/service';
import { Service } from './service.model';

const newResource = churchService();
newResource._id = 1000;
const params = {
  id: newResource._id,
};
const updateResource = churchService();
updateResource._id = 1000;

createApiSpec(Service, 'service', newResource, params, updateResource);
