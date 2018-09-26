import faker from 'faker';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Info from '../../api/resources/info/info.model';
import { info as fakerInfo } from '../faker.request.body';

dotenv.config();

const dbUrl = process.env.MONGODB_URL;
const adminname = faker.name.findName();

describe('SCHEMA: INFO', () => {
  it('should have english language bible { verse, from }, denomination, and name', () => {
    const { en, ...part } = fakerInfo;
    const info = new Info({ ...part, adminname });
    info.validate((e) => {
      expect(e.errors['en.bible.from']).toBeDefined();
      expect(e.errors['en.bible.verse']).toBeDefined();
      expect(e.errors['en.denomination']).toBeDefined();
      expect(e.errors['en.name']).toBeDefined();
    });
  });

  it('should have secondary language bible { verse, from }, denomination, and name', () => {
    const { sl, ...part } = fakerInfo;
    const info = new Info({ ...part, adminname });
    info.validate((e) => {
      expect(e.errors['sl.bible.from']).toBeDefined();
      expect(e.errors['sl.bible.verse']).toBeDefined();
      expect(e.errors['sl.denomination']).toBeDefined();
      expect(e.errors['sl.name']).toBeDefined();
    });
  });

  it('should have phone', () => {
    const { phone, ...part } = fakerInfo;
    const info = new Info({ ...part, adminname });
    info.validate((e) => {
      expect(e.errors.phone).toBeDefined();
    });
  });

  it('should have email', () => {
    const { email, ...part } = fakerInfo;
    const info = new Info({ ...part, adminname });
    info.validate((e) => {
      expect(e.errors.email).toBeDefined();
    });
  });

  it('should have proper email', () => {
    const { email, ...part } = fakerInfo;
    const info = new Info({ ...part, adminname, email: 'abcatgmail.com' });
    info.validate((e) => {
      expect(e.errors.email).toBeDefined();
    });
  });

  it('should have address', () => {
    const { address, ...part } = fakerInfo;
    const info = new Info({ ...part, adminname });
    info.validate((e) => {
      expect(e.errors['address.country']).toBeDefined();
      expect(e.errors['address.city']).toBeDefined();
      expect(e.errors['address.street']).toBeDefined();
    });
  });

  it('should have admin name', () => {
    const info = new Info({ ...fakerInfo });
    info.validate((e) => {
      expect(e.errors.adminname).toBeDefined();
    });
  });

  describe('INFO: SAVE:', () => {
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
      const info = new Info({ ...fakerInfo, adminname });
      info.save(done);
    });

    it('should not have blank english language dataset', () => {
      const { en, ...part } = fakerInfo;
      const info = new Info({ ...part });

      info.save((e) => {
        expect(e).not.toBeNull();
      });
    });

    it('should not have blank secondary language dataset', () => {
      const { sl, ...part } = fakerInfo;
      const info = new Info({ ...part });

      info.save((e) => {
        expect(e).not.toBeNull();
      });
    });

    it('should not save with incorrect dataset', async () => {
      const info = new Info({ ...fakerInfo });
      await info.save((e) => {
        expect(e.errors.adminname).toBeDefined();
      });
    });

    it('should find saved dataset', async () => {
      await Info.find({ adminname }, (error, document) => {
        expect(document).not.toBeNull();
        expect(document[0].adminname).toEqual(adminname);
      });
    });
  });
});
