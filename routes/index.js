const router = require('express').Router();

const routerUser = require('./users');
const { signupUser, signinUser } = require('../controllers/users');
const sign = require('../middlewares/sign');
const routerMovie = require('./movies');
const NotFoundError = require('../errors/NotFoundError');
const { signInUpValid } = require('../utils/validation');

router.post('/signup', signInUpValid, signupUser);
router.post('/signin', signInUpValid, signinUser);

router.use(sign);

router.use('/users', routerUser);
router.use('/movies', routerMovie);

router.use((req, res, next) => {
  next(new NotFoundError(404));
});

module.exports = router;
