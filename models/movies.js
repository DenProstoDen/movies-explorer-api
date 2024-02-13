const mongoose = require('mongoose');
const validator = require('validator');

const moviesSchema = new mongoose.Schema({
  country: {
    type: String,
    required: {
      value: true,
      message: 'Поле является обязательным',
    },
  },
  director: {
    type: String,
    required: {
      value: true,
      message: 'Поле является обязательным',
    },
  },
  duration: {
    type: Number,
    required: {
      value: true,
      message: 'Поле является обязательным',
    },
  },
  year: {
    type: Number,
    required: {
      value: true,
      message: 'Поле является обязательным',
    },
  },
  decription: {
    type: String,
    required: {
      value: true,
      message: 'Поле является обязательным',
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Некорректный URL',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Некорректный URL',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Некорректный URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'movie',
  },
  nameRU: {
    type: String,
    required: {
      value: true,
      message: 'Поле является обязательным',
    },
  },
  nameEN: {
    type: String,
    required: {
      value: true,
      message: 'Поле является обязательным',
    },
  },
});

module.exports = mongoose.model('card', moviesSchema);
