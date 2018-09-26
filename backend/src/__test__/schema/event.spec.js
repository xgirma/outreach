import faker from 'faker';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import moment from 'moment/moment';
import { Event } from '../../api/resources/event/event.model';
import { event as fakerEvent } from '../faker.request.body';

dotenv.config();

const dbUrl = process.env.MONGODB_URL;
const adminname = faker.name.findName();
const startDate = moment()
  .add(7, 'days')
  .format();
const endDate = moment()
  .add(17, 'days')
  .format();
const date = { startDate, endDate };
const dateInPast = moment()
  .subtract(7, 'days')
  .format();
const today = moment().format();

describe('SCHEMA: EVENT', () => {
  it('should have english language title', () => {
    const { en, ...part } = fakerEvent;
    const event = new Event({ ...part, adminname, ...date });
    event.validate((e) => {
      expect(e.errors['en.title']).toBeDefined();
    });
  });

  it('should have secondary language title', () => {
    const { sl, ...part } = fakerEvent;
    const event = new Event({ ...part, adminname, ...date });
    event.validate((e) => {
      expect(e.errors['sl.title']).toBeDefined();
    });
  });

  it('should have phone', () => {
    const { phone, ...part } = fakerEvent;
    const event = new Event({ ...part, adminname, ...date });
    event.validate((e) => {
      expect(e.errors.phone).toBeDefined();
    });
  });

  it('should have proper email', () => {
    const { email, ...part } = fakerEvent;
    const event = new Event({ ...part, adminname, ...date, email: 'abcatgmail.com' });
    event.validate((e) => {
      expect(e.errors.email).toBeDefined();
    });
  });

  it('should have address', () => {
    const { address, ...part } = fakerEvent;
    const event = new Event({ ...part, adminname, ...date });
    event.validate((e) => {
      expect(e.errors['address.country']).toBeDefined();
      expect(e.errors['address.city']).toBeDefined();
      expect(e.errors['address.street']).toBeDefined();
    });
  });

  it('should have start date', () => {
    const { dateStart, ...part } = fakerEvent;
    const event = new Event({ ...part, adminname, endDate });
    event.validate((e) => {
      expect(e.errors.dateStart).toBeDefined();
    });
  });

  it('should have end date', () => {
    const { dateEnd, ...part } = fakerEvent;
    const event = new Event({ ...part, adminname, startDate });
    event.validate((e) => {
      expect(e).not.toBeNull(); // TODO BadRequest: end date must be greater than start date
    });
  });

  it('should have admin name', () => {
    const event = new Event({ ...fakerEvent });
    event.validate((e) => {
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
      const event = new Event({ ...fakerEvent, adminname, ...date });
      event.save(done);
    });

    it('should not have blank english language dataset', () => {
      const { en, ...part } = fakerEvent;
      const event = new Event({ ...part, ...date });

      event.save((e) => {
        expect(e).not.toBeNull();
      });
    });

    it('should not have blank secondary language dataset', () => {
      const { sl, ...part } = fakerEvent;
      const event = new Event({ ...part, ...date });

      event.save((e) => {
        expect(e).not.toBeNull();
      });
    });

    it('should not have blank secondary language dataset', () => {
      const { sl, ...part } = fakerEvent;
      const event = new Event({ ...part, ...date });

      event.save((e) => {
        expect(e).not.toBeNull();
      });
    });

    it('no past start date', async () => {
      const event = new Event({
        ...fakerEvent,
        dateStart: dateInPast,
        dateEnd: endDate,
        adminname,
      });
      await event.save((e) => {
        expect(e).toBeDefined();
      });
    });

    it('same start and end date', async () => {
      const event = new Event({ ...fakerEvent, dateStart: today, dateEnd: today, adminname });
      await event.save((e) => {
        expect(e).toBeNull();
      });
    });

    it('start date must be greater than or equal to now', async () => {
      const event = new Event({ ...fakerEvent, dateStart: endDate, dateEnd: startDate, adminname });
      await event.save((e) => {
        expect(e).toBeDefined();
      });
    });

    it('should find saved dataset', async () => {
      await Event.find({ adminname }, (error, document) => {
        expect(document).not.toBeNull();
        expect(document[0].adminname).toEqual(adminname);
      });
    });
  });
});
