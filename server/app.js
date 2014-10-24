/**
 * Main application file
 */

'use strict';

// Set default node environment to development
//process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.NODE_ENV = 'development';
var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
var swig = require('swig');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = require('http').createServer(app);
var socketio = require('socket.io').listen(server);
var peerServerQueue = require('./config/peerServerQueue');

require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);

app.engine ('html', swig.renderFile);
app.set('view engine', 'html');



// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));

  peerServerQueue.setup(3000, socketio);

});

// Expose app
exports = module.exports = app;