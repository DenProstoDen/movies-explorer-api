const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequest = require('../errors/BadRequest');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const { NODE_ENV, JWT_SECRET } = require('../utils/config');

module.exports.signupUser = (req, res, next) => {
  const { name, password, email } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(200).send({
      name: user.name,
      _id: user._id,
      email: user.email,
    }))
    .catch((err) => {
      if (err.code === ERROR_CODENUMBER) {
        next(new ConflictError(MESSAGE_CONFLICTERROR));
      } else if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequest(MESSAGE_BADREQUESTERROR));
      } else {
        next(err);
      }
    });
};

module.exports.signinUser = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredential(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(STATUS_OK).send(user))
    .catch(next);
};

module.exports.updateUserProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        next(new NotFoundError(MESSAGE_NOTFOUNDERROR));
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequest(MESSAGE_BADREQUESTERROR));
      } else if (err.code === ERROR_CODENUMBER) {
        next(new ConflictError(MESSAGE_CONFLICTERROR));
      } else { next(err); }
    });
};