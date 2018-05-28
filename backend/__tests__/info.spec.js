import churchInfo from '../helpers/faker.info';
import crud from '../helpers/crud';

crud('info', churchInfo(), churchInfo());
