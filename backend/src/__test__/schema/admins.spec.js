import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admins from '../../api/resources/admins/admins.model';
import { admin as fakerAdmins } from '../faker.request.body';

const adminUser = { passwordHash: fakerAdmins.password, username: fakerAdmins.username, role: '0' };

dotenv.config();

const dbUrl = process.env.MONGODB_URL;

describe('SCHEMA: ADMINS', () => {
  it('should have username', () => {
    const { username, ...parts } = adminUser;
    const admins = new Admins({ ...parts });
    admins.validate((e) => {
      expect(e.errors.username).toBeDefined();
    });
  });

  it('should have password', () => {
    const { passwordHash, ...parts } = adminUser;
    const admins = new Admins({ ...parts });
    admins.validate((e) => {
      expect(e.errors.passwordHash).toBeDefined();
    });
  });

  it('should have role', () => {
    const { role, ...parts } = adminUser;
    const admins = new Admins({ ...parts });
    admins.validate((e) => {
      expect(e.errors.role).toBeDefined();
    });
  });

  describe('ADMINS: SAVE:', () => {
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
      const admins = new Admins({ ...adminUser });
      admins.save(done);
    });

    it('should not save with incorrect dataset', async () => {
      const { role, ...part } = adminUser;
      const admins = new Admins({ ...part });
      await admins.save((e) => {
        expect(e.errors.role).toBeDefined();
      });
    });

    it('should find saved dataset', async () => {
      await Admins.find({ role: adminUser.role }, (error, document) => {
        expect(document).not.toBeNull();
      });
    });
  });
});
