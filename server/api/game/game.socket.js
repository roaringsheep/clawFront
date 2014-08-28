/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Game = require('./game.model');

exports.register = function(socket) {
  Game.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Game.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}
var piSocket;
exports.registerPi = function(socket){
  piSocket = socket;
  console.log('r,r,registered!')
}

exports.emitToPi = function(stat, data) {
  console.log(piSocket);
  console.log('emiting', stat, data);
	piSocket.emit(stat,data);
}

function onSave(socket, doc, cb) {
  socket.emit('game:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('game:remove', doc);
}