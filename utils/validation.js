const { celebrate, Joi } = require('celebrate');

const urlReg = /^(https?:\/\/(www\.)?([a-zA-z0-9-]){1,}\.?([a-zA-z0-9]){2,8}(\/?([a-zA-z0-9-])*\/?)*\/?([-._~:/?#[]@!\$&'\(\)\*\+,;=])*)/;

module.exports.signInValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.signUpValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.getUserIdValidate = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
});

module.exports.postCreatMovieValidate = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required().min(2).max(30),
    duration: Joi.string().required(),
    year: Joi.string().required(),
    decription: Joi.string().required(),
    image: Joi.string().required().pattern(urlReg),
    trailerLink: Joi.string().required().pattern(urlReg),
    thumbnail: Joi.string().required().pattern(urlReg),
    movieId: Joi.number().integer().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});
module.exports.fetchMovieValidate = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
});
