'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.post('/pwrecovery', controller.pwcheck);
router.get('/reset/:token', controller.reset);
router.post('/reset/:token', controller.resetPassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
// router.post('/updateMe', auth.isAuthenticated(), controller.update);
router.post('/:id', auth.isAuthenticated(), controller.update);

module.exports = router;
