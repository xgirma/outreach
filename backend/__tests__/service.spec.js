import churchService from '../helpers/faker.service';
import crud from '../helpers/crud';

crud('service', churchService(), churchService());
