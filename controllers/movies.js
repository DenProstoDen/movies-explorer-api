const mongoose = require('mongoose');
const Movie = require('../models/movie');
const BadRequest = require('../errors/400_BadRequest');
const ForbiddenError = require('../errors/403_ForbiddenError');
const NotFoundError = require('../errors/404_NotFoundError');

module.exports.getMovie = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports.postMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequest('Данные введены некорректно'));
      } else { next(err); }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError(404));
      }
      if (movie.owner.toString() !== req.user._id) {
        return next(new ForbiddenError('Другой пользователь, нельзя удалить'));
      }
      return Movie.findByIdAndDelete(movieId)
        .then(() => { res.status(201).send({ message: 'Успешно'}); });
    })
    .catch(next);
};