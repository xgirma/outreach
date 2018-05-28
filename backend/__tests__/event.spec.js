import churchEvent from '../helpers/faker.event';
import crud from '../helpers/crud';

crud('event', churchEvent(), churchEvent());
