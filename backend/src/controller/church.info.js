import mongoose from "mongoose";
import { Router } from "express";
import Info from "../model/church.info";

export default ({ config, db }) => {
  const api = Router();

  // '/v1/info/:id' - Update
  api.put("/:id", (req, res) => {
    Info.findById(req.params.id, (err, info) => {
      if (err) {
        res.send(err);
      }

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

      info.save(err => {
        if (err) {
          res.send(err);
        }
        res.send({ message: "Church information updated." });
      });
    });
  });

  return api;
};
