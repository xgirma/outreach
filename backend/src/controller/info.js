import { Router } from 'express';
import Boom from 'boom';
import Info from '../model/info';
import logger from '../config/logger';

export default ({ config, db }) => {
  const api = Router();

  // '/v1/info/:id' - Update
  api.put('/:id', (req, res, next) => {
    /* eslint-disable no-alert, consistent-return */
    Info.findById(req.params.id, (err, info) => {
      if (err) {
        logger.error('Internal Server Error', { err });
        return setImmediate(() => {
          res.status(500).send({ errors: [{ code: 500, message: 'Internal Server Error' }] });
        });
      }
      if (info !== null) {
        info.am.name = req.body.am.name;
        info.am.denomination = req.body.am.denomination;
        info.am.phone = req.body.am.phone;
        info.am.address.street = req.body.am.address.street;
        info.am.address.city = req.body.am.address.city;
        info.am.address.state = req.body.am.address.state;
        info.am.address.zip = req.body.am.address.zip;
        info.am.address.country = req.body.am.address.country;
        info.am.bible.verse = req.body.am.bible.verse;
        info.am.bible.from = req.body.am.bible.from;

        info.en.name = req.body.en.name;
        info.en.denomination = req.body.en.denomination;
        info.en.phone = req.body.en.phone;
        info.en.address.street = req.body.en.address.street;
        info.en.address.city = req.body.en.address.city;
        info.en.address.state = req.body.en.address.state;
        info.en.address.zip = req.body.en.address.zip;
        info.en.address.country = req.body.en.address.country;
        info.en.bible.verse = req.body.en.bible.verse;
        info.en.bible.from = req.body.en.bible.from;

        info.save((saveErr) => {
          if (saveErr) {
            logger.error(`Church information is not saved ${saveErr}`);
            return setImmediate(() => {
              res.status(406).send(Boom.notAcceptable('Update can not be saved'));
            });
          }
          logger.info(`Church information updated for [${req.params.id}]`);
          return res.status(202).send({ message: 'Church information updated.', data: info });
        });
      } else {
        const error = {
          id: 'BR400',
          links: { about: '' },
          status: '400',
          code: '',
          title: 'Bad Request',
          detail: `ID should be either 1 or 2. Provided ${
            req.params.id
          }. Given you have document 1 and 2 by default and they are not deleted or updated`,
          source: { pointer: '', parameter: '' },
          meta: {},
        };

        logger.error('Bad Request', error);
        return setImmediate(() => {
          res.status(400).send({ errors: [{ code: error.id, message: error.detail }] });
        });
      }
    });
    /* eslint-enable no-alert, consistent-return */
  });

  return api;
};
