const routerMovie = require('express').Router();

const { getMovie, postMovie, deleteMovie } = require('../controllers/movies');
const { deleteMovieValidate, postMovieValidate } = require('../utils/validation');

routerMovie.get('/', getMovie);

routerMovie.post('/', postMovieValidate, postMovie);

routerMovie.delete('/:movieId', deleteMovieValidate, deleteMovie);

module.exports = routerMovie;
