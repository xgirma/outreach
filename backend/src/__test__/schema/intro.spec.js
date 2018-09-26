import faker from 'faker';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Intro } from '../../api/resources/intro/intro.model';
import { intro as fakerIntro } from '../faker.request.body';

dotenv.config();

const dbUrl = process.env.MONGODB_URL;
const adminname = faker.name.findName();
const blankHtml = '<p><br></p>';

describe('SCHEMA: INTRO', () => {
  it('should have english language intro', () => {
    const { en, ...part } = fakerIntro;
    const intro = new Intro({ ...part, adminname });
    intro.validate((e) => {
      expect(e.errors['en.intro']).toBeDefined();
    });
  });

  it('should have secondary language intro', () => {
    const { sl, ...part } = fakerIntro;
    const intro = new Intro({ ...part, adminname });
    intro.validate((e) => {
      expect(e.errors['sl.intro']).toBeDefined();
    });
  });

  it('should have admin name', () => {
    const intro = new Intro({ ...fakerIntro });
    intro.validate((e) => {
      expect(e.errors.adminname).toBeDefined();
    });
  });

  describe('INTRO: SAVE:', () => {
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
      const intro = new Intro({ ...fakerIntro, adminname });
      intro.save(done);
    });

    it('should not have blank english language intro', () => {
      const { en, ...part } = fakerIntro;
      const blank = { en: { intro: blankHtml } };
      const intro = new Intro({ ...part, ...blank });

      intro.save((e) => {
        expect(e).not.toBeNull();
      });
    });

    it('should not have blank secondary language intro', () => {
      const { sl, ...part } = fakerIntro;
      const blank = { sl: { intro: blankHtml } };
      const intro = new Intro({ ...part, ...blank });

      intro.save((e) => {
        expect(e).not.toBeNull();
      });
    });

    it('should not save with incorrect dataset', async () => {
      const intro = new Intro({ ...fakerIntro });
      await intro.save((e) => {
        expect(e.errors.adminname).toBeDefined();
      });
    });

    it('should find saved dataset', async () => {
      await Intro.find({ adminname }, (error, document) => {
        expect(document).not.toBeNull();
        expect(document[0].adminname).toEqual(adminname);
      });
    });
  });
});
