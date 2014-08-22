'use strict';

var _ = require('lodash');
var Queue = require('./queue.model');

// Get list of users in the queue
exports.index = function(req, res) {
  Queue.find(function (err, queues) {
    if(err) { return handleError(res, err); }
    return res.json(200, queues);
  });
};

// Get a single user in the queue
exports.show = function(req, res) {
  Queue.findById(req.params.id, function (err, queue) {
    if(err) { return handleError(res, err); }
    if(!queue) { return res.send(404); }
    return res.json(queue);
  });
};

// Pushes user to the queue the DB.
exports.create = function(req, res) {
  var username = req.body.username,
  userId = req.body.userId,
  active = req.body.active,
  index = req.body.index;

  Queue.create({
    username: username,
    userId: userId,
    active: active,
    index: index
      }, function(err, queue) {
    if(err) { return handleError(res, err); }
    return res.json(201, queue);
  });
};

// Updates an existing user in the queue in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Queue.findById(req.params.id, function (err, queue) {
    if (err) { return handleError(res, err); }
    if(!queue) { return res.send(404); }
    var updated = _.merge(queue, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, queue);
    });
  });
};

// Deletes a user from the queue in the DB.
exports.destroy = function(req, res) {
  Queue.findById(req.params.id, function (err, queue) {
    if(err) { return handleError(res, err); }
    if(!queue) { return res.send(404); }
    queue.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}