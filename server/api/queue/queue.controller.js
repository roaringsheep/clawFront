'use strict';
var express = require('express');
var session = require('express-session')
var _ = require('lodash');
var Queue = require('./queue.model');


// Get list of users in the queue
exports.index = function(req, res) {
  Queue.find(function (err, queues) {
    console.log("req.session", req.session, "secret: ", config.secrets.session);
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

// Pushes user to the queue.
exports.create = function(req, res) {
  console.log("req.body", req.body)
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
// exports.update = function(req, res) {
//   if(req.body._id) { delete req.body._id; }
//   Queue.findById(req.params.id, function (err, queue) {
//     if (err) { return handleError(res, err); }
//     if(!queue) { return res.send(404); }
//     var updated = _.merge(queue, req.body);
//     updated.save(function (err) {
//       if (err) { return handleError(res, err); }
//       return res.json(200, queue);
//     });
//   });
// };

exports.update = function(req, res, next) {
    
    console.log(req.body);
    Queue.update({
        userId: req.params.id
    }, {
        timeAtHead: req.body.timeAtHead
    }, function(err, queue) {
        if (err) {
            return next(err);
        }
        if (!queue) {
            return res.json(401);
        }
        res.json(queue);
    });
}


// Deletes a user from the queue in the DB.
exports.destroy = function(req, res) {
  console.log("req.params: ", req.params)
  Queue.findOne({"userId": req.params.id}, function (err, queue) {
    if(err) { return handleError(res, err); }
    if(!queue) { return res.send(404); }
    console.log("queue: ", queue)
    queue.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

// Deletes a user from the queue in the DB.
// exports.destroy = function(req, res) {
//   Queue.findOne({""}, function (err, queue) {
//     if(err) { return handleError(res, err); }
//     if(!queue) { return res.send(404); }
//     queue.remove(function(err) {
//       if(err) { return handleError(res, err); }
//       return res.send(204);
//     });
//   });
// };

function handleError(res, err) {
  return res.send(500, err);
}