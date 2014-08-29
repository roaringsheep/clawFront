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
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
<<<<<<< HEAD
//router.post('/charge', auth.isAuthenticated(), controller.update);
=======
// router.post('/updateMe', auth.isAuthenticated(), controller.update);
router.post('/:id', auth.isAuthenticated(), controller.update);
>>>>>>> 0d10970c1a1fadba3fec465c8c586d624469e49c

module.exports = router;
