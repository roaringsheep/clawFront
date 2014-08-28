/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Queue = require('./queue.model');

exports.register = function(socket) {
  Queue.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Queue.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('queue:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('queue:remove', doc);
}