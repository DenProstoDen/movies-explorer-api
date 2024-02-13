const routerUser = require('express').Router();

const { getUserMe, updateUserProfile } = require('../controllers/users');
const { patchUpdateUserValidate } = require('../utils/validation');

routerUser.get('/me', getUserMe);

routerUser.patch('/me', patchUpdateUserValidate, updateUserProfile);

module.exports = routerUser;
