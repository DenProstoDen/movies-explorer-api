const router = require('express').Router();

const routerUser = require('./users');
const { signupUser, signinUser } = require('../controllers/users');
const sign = require('../middlewares/sign');
const routerMovie = require('./movies');
const NotFoundError = require('../errors/404_NotFoundError');
const { signInUpValid } = require('../utils/validation');
const { MESSAGE_NOTFOUNDERROR } = require('../utils/constans');

// POST /signup/signin
router.post('/signup', signInUpValid, signupUser);
router.post('/signin', signInUpValid, signinUser);

router.use(sign);

// подключение роутов юзера и фильмов
router.use('/users', routerUser);
router.use('/movies', routerMovie);

router.use((req, res, next) => {
  next(new NotFoundError(MESSAGE_NOTFOUNDERROR));
});

module.exports = router;