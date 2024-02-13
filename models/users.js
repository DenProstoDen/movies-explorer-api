const mongoose = require('mongoose');
const validator = require('validator');
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');
const AuthorisationError = require('../errors/AuthorisationError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Минимальная длина — 2 символа'],
    maxlength: [30, 'Максимальная длина — 30 символов'],
  },
  email: {
    type: String,
    required: {
      value: true,
      message: 'Поле email является обязательным',
    },
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Некорректный адрес электронной почты',
    },
  },
  password: {
    type: String,
    required: {
      value: true,
      message: 'Поле password является обязательным',
    },
    select: false,
  },
}, { versionKey: false, timestamps: true });

userSchema.statics.findUserByCredential = function findOne(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthorisationError('Неправильная почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthorisationError('Неправильная почта или пароль');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
