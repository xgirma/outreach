import { Router } from 'express';
import Info from '../model/info';
import logger from '../config/logger';
import { SERVERERR, DBSAVEERR, BADREQERR } from '../helpers/error.codes';

export default ({ config, db }) => {
  const api = Router();

  // '/v1/info/:id' - Update
  api.put('/:id', (req, res, next) => {
    Info.findById(req.params.id, (err, info) => {
      if (err) {
        const error = { ...SERVERERR, meta: err };
        logger.error(SERVERERR.title, { error });
        return setImmediate(() => {
          res
            .status(SERVERERR.status)
            .send({ errors: [{ code: SERVERERR.code, message: SERVERERR.title }] });
        });
      }
      if (info !== null) {
        info.am.name = req.body.am.name;
        info.am.denomination = req.body.am.denomination;
        info.am.phone = req.body.am.phone;
        info.am.email = req.body.am.email;
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
        info.en.email = req.body.en.email;
        info.en.address.street = req.body.en.address.street;
        info.en.address.city = req.body.en.address.city;
        info.en.address.state = req.body.en.address.state;
        info.en.address.zip = req.body.en.address.zip;
        info.en.address.country = req.body.en.address.country;
        info.en.bible.verse = req.body.en.bible.verse;
        info.en.bible.from = req.body.en.bible.from;

        info.save((saveErr) => {
          if (saveErr) {
            const error = { ...DBSAVEERR, meta: saveErr };
            logger.error('Church information is not saved', { error });
            return setImmediate(() => {
              res
                .status(DBSAVEERR.status)
                .send({ errors: [{ code: DBSAVEERR.code, message: DBSAVEERR.title }] });
            });
          }
          logger.info(`Church information updated for [${req.params.id}]`);
          return res.status(202).send({ message: 'Church information updated.', data: info });
        });
      } else {
        logger.error(BADREQERR.title, BADREQERR);
        return setImmediate(() => {
          res
            .status(BADREQERR.status)
            .send({ errors: [{ code: BADREQERR.id, message: BADREQERR.title }] });
        });
      }
    });
  });

  return api;
};
