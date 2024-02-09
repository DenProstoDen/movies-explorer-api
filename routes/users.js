const router = require('express').Router();

const {
  getUsers, updateUserProfile, getUserMe,
} = require('../controllers/users');
const {
  patchUpdateUserValidate,
  patchUpdateAvatarValidate,
} = require('../utils/validation');

router.get('/', getUsers);

router.get('/me', getUserMe);

router.patch('/me', patchUpdateUserValidate, updateUserProfile);

router.patch('/me/avatar', patchUpdateAvatarValidate, updateAvatar);

module.exports = router;