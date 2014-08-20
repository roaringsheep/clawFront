'use strict';

var _ = require('lodash');
var Queue = require('./queue.model');

// Get list of queues
exports.index = function(req, res) {
  Queue.find(function (err, queues) {
    if(err) { return handleError(res, err); }
    return res.json(200, queues);
  });
};

// Get a single queue
exports.show = function(req, res) {
  Queue.findById(req.params.id, function (err, queue) {
    if(err) { return handleError(res, err); }
    if(!queue) { return res.send(404); }
    return res.json(queue);
  });
};

// Creates a new queue in the DB.
exports.create = function(req, res) {
  Queue.create(req.body, function(err, queue) {
    if(err) { return handleError(res, err); }
    return res.json(201, queue);
  });
};

// Updates an existing queue in the DB.
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

// Deletes a queue from the DB.
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