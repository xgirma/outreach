import faker from 'faker';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Service } from '../../api/resources/service/service.model';
import { service as fakerService } from '../faker.request.body';

dotenv.config();

const dbUrl = process.env.MONGODB_URL;
const adminname = faker.name.findName();

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);

describe('SCHEMA: SERVICE', () => {
  it('should have title for secondary language', () => {
    const { sl, ...part } = fakerService;
    const service = new Service({ ...part, adminname });
    service.validate((e) => {
      expect(e.errors['sl.title']).toBeDefined();
    });
  });

  it('should have title for english language', () => {
    const { en, ...part } = fakerService;
    const service = new Service({ ...part, adminname });
    service.validate((e) => {
      expect(e.errors['en.title']).toBeDefined();
    });
  });

  it('should have phone', () => {
    const { phone, ...part } = fakerService;
    const service = new Service({ ...part, adminname });
    service.validate((e) => {
      expect(e.errors.phone).toBeDefined();
    });
  });

  it('should have email', () => {
    const { email, ...part } = fakerService;
    const service = new Service({ ...part, adminname });
    service.validate((e) => {
      expect(e.errors.email).toBeDefined();
    });
  });

  it('should have proper email', () => {
    const { email, ...part } = fakerService;
    const service = new Service({ ...part, adminname, email: 'abcatgmail.com' });
    service.validate((e) => {
      expect(e.errors.email).toBeDefined();
    });
  });

  it('should have adminname', () => {
    const service = new Service({ ...fakerService });
    service.validate((e) => {
      expect(e.errors.adminname).toBeDefined();
    });
  });

  describe('SERVICE: SAVE', () => {
    beforeAll((done) => {
      mongoose.connect(dbUrl);
      mongoose.connection.once('open', () => {
        done();
      });
    });

    afterAll((done) => {
      mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(done);
      });
    });

    it('should save with correct dataset', (done) => {
      const service = new Service({ ...fakerService, adminname });
      service.save(done);
    });

    it('should not save with incorrect dataset', async () => {
      const service = new Service({ ...fakerService });
      await service.save((e) => {
        expect(e.errors.adminname).toBeDefined();
      });
    });

    it('should find saved dataset', async () => {
      await Service.find({ adminname }, (error, document) => {
        expect(document).not.toBeNull();
        expect(document[0].adminname).toEqual(adminname);
      });
    });
  });
});
