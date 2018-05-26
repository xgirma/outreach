/* eslint-disable no-underscore-dangle */
import createApiSpec from '../../../helpers/apiSpecs';
import churchEvent from '../../../helpers/faker.event';
import { Event } from './event.model';

const newResource = churchEvent();
newResource._id = 1000;
const params = {
  id: newResource._id,
};
const updateResource = churchEvent();
updateResource._id = 1000;

createApiSpec(Event, 'event', newResource, params, updateResource);
