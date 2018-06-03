import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import { User } from '../resources/user/user.model';
import logger from './logger';

const secret = process.env.JWT_SECRET;

const checkToken = expressJwt({ secret });

export const verifyUser = () => (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res.status(400).send('You need a username and password');
    return;
  }

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        res.status(401).send('No user with the given username');
      } else if (!user.authenticate(password)) {
        res.status(401).send('Wrong password');
      } else {
        req.user = user;
        next();
      }
    })
    .catch((error) => next(error));
};

export const signToken = (id) =>
  jwt.sign({ id }, secret, { expiresIn: process.env.EXPIRATION_TIME });

export const signin = (req, res, next) => {
  const token = signToken(req.user.id);
  res.json({ token });
};
