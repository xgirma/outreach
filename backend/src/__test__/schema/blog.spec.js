import faker from 'faker';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Blog } from '../../api/resources/blog/blog.model';
import { blog as fakerBlog } from '../faker.request.body';

dotenv.config();

const dbUrl = process.env.MONGODB_URL;
const adminname = faker.name.findName();
const blankHtml = '<p><br></p>';

describe('SCHEMA: BLOG', () => {
  it('should have english language blog', () => {
    const { en, ...part } = fakerBlog;
    const blog = new Blog({ ...part, adminname });
    blog.validate((e) => {
      expect(e.errors['en.title']).toBeDefined();
      expect(e.errors['en.description']).toBeDefined();
    });
  });

  it('should have secondary language blog', () => {
    const { sl, ...part } = fakerBlog;
    const blog = new Blog({ ...part, adminname });
    blog.validate((e) => {
      expect(e.errors['sl.title']).toBeDefined();
      expect(e.errors['sl.description']).toBeDefined();
    });
  });

  it('should have author', () => {
    const { author, ...part } = fakerBlog;
    const blog = new Blog({ ...part, adminname });
    blog.validate((e) => {
      expect(e.errors.author).toBeDefined();
    });
  });

  it('should have admin name', () => {
    const blog = new Blog({ ...fakerBlog });
    blog.validate((e) => {
      expect(e.errors.adminname).toBeDefined();
    });
  });

  describe('BLOG: SAVE:', () => {
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
      const blog = new Blog({ ...fakerBlog, adminname });
      blog.save(done);
    });

    it('should not have blank english language description', () => {
      const { en, ...part } = fakerBlog;
      const blank = { en: { description: blankHtml } };
      const blog = new Blog({ ...part, ...blank });

      blog.save((e) => {
        expect(e).not.toBeNull();
      });
    });

    it('should not have blank secondary language description', () => {
      const { sl, ...part } = fakerBlog;
      const blank = { sl: { description: blankHtml } };
      const blog = new Blog({ ...part, ...blank });

      blog.save((e) => {
        expect(e).not.toBeNull();
      });
    });

    it('should not save with incorrect dataset', async () => {
      const blog = new Blog({ ...fakerBlog });
      await blog.save((e) => {
        expect(e.errors.adminname).toBeDefined();
      });
    });

    it('should find saved dataset', async () => {
      await Blog.find({ adminname }, (error, document) => {
        expect(document).not.toBeNull();
        expect(document[0].adminname).toEqual(adminname);
      });
    });
  });
});
