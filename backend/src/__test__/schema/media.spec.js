import faker from 'faker';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Media } from '../../api/resources/media/media.model';
import { media as fakerMedia } from '../faker.request.body';

dotenv.config();

const dbUrl = process.env.MONGODB_URL;
const adminname = faker.name.findName();

describe('SCHEMA: MEDIA', () => {
  it('should have title', () => {
    const { title, ...part } = fakerMedia;
    const media = new Media({ ...part, adminname });
    media.validate((e) => {
      expect(e.errors.title).toBeDefined();
    });
  });

  it('should have url', () => {
    const { url, ...part } = fakerMedia;
    const media = new Media({ ...part, adminname });
    media.validate((e) => {
      expect(e.errors.url).toBeDefined();
    });
  });

  it('should have media type', () => {
    const { mediaType, ...part } = fakerMedia;
    const media = new Media({ ...part, adminname });
    media.validate((e) => {
      expect(e.errors.mediaType).toBeDefined();
    });
  });

  it('should have admin name', () => {
    const media = new Media({ ...fakerMedia });
    media.validate((e) => {
      expect(e.errors.adminname).toBeDefined();
    });
  });

  it('should have media type of [video, audio]', () => {
    const { mediaType, ...part } = fakerMedia;
    const media = new Media({ ...part, adminname, mediaType: 'song' });
    media.validate((e) => {
      expect(e.errors.mediaType).toBeDefined();
    });
  });

  it('should have media type of [video, audio]', () => {
    const { mediaType, ...part } = fakerMedia;
    const media = new Media({ ...part, adminname, mediaType: 'video' });
    media.validate((e) => {
      expect(e).toBeNull();
    });
  });

  it('should have media type of [video, audio]', () => {
    const { mediaType, ...part } = fakerMedia;
    const media = new Media({ ...part, adminname, mediaType: 'audio' });
    media.validate((e) => {
      expect(e).toBeNull();
    });
  });

  describe('MEDIA: SAVE:', () => {
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
      const media = new Media({ ...fakerMedia, adminname });
      media.save(done);
    });

    it('should not save with incorrect dataset', async () => {
      const media = new Media({ ...fakerMedia });
      await media.save((e) => {
        expect(e.errors.adminname).toBeDefined();
      });
    });

    it('should find saved dataset', async () => {
      await Media.find({ adminname }, (error, document) => {
        expect(document).not.toBeNull();
        expect(document[0].adminname).toEqual(adminname);
      });
    });
  });
});
