'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId,
    UserSchema = mongoose.model('User');

var QueueSchema = new Schema({
  user: ObjectId,
  index: String,
  active: Boolean
});

module.exports = mongoose.model('Queue', QueueSchema);