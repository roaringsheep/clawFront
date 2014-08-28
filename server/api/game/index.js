'use strict';

var express = require('express');
var controller = require('./game.controller');
var request = require('request');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.post('/pi', controller.pokePi);
router.post('/fix', controller.fixShit);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;