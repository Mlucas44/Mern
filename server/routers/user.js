const express = require('express');
const router = express.Router();
const requireAuth = require('./../middleware/requireAuth');
const requireRole = require('./../middleware/requireRole');
const { signupUser, loginUser, getUserInfo } = require('./../controllers/userController')

router.post('/signup', signupUser)

router.post('/login', loginUser)

// route restreinte à l'administrateur
//router.get('/restricted', requireAuth, requireRole('admin'), restrictedController.getRestrictedPage);

router.get('/me', requireAuth, getUserInfo)

module.exports = router;