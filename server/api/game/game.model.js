'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var GameSchema = new Schema({
  date: {type: Date, default: Date.now},
  hasWinner: {type: Boolean, default: false},
  videos: [ObjectId]
});

module.exports = mongoose.model('Game', GameSchema);