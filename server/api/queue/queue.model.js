'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId,
    UserSchema = mongoose.model('User');

var QueueSchema = new Schema({

  userId: ObjectId,
  username: String,
  index: Number,
  timeAtHead: Number,
  active: {type: Boolean, default: false}

});



module.exports = mongoose.model('Queue', QueueSchema);