const express = require('express');
const router = express.Router();
const requireAuth = require('./middlewares/requireAuth');
const requireRole = require('./middlewares/requireRole');
const adminController = require('./../controllers/adminController');

//admin route
router.get('/admin', requireAuth, requireRole('admin'), adminController.getAdminPage);

module.exports = router;
