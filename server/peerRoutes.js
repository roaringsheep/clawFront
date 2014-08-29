'use strict';

var express = require('express');
var router = express.Router();

var peerPool = require('./config/peerPool');

router.post('/confirmID', function(req, res) {
  var requestID = req.body.id;
  var secret = req.body.secret;
  var added = false;

  console.log(new Date(), 'Request to add ', requestID, ' to confirmed list...');

  if (requestID) {
    added = peerPool.confirmPeer(requestID, secret);
  }

  if (!requestID || !added) {
    console.log('Failure - Confirmed Peers List: ', peerPool.confirmedConnectedPeers);

    res.send(400, {
      error: 'The Peer ID sent to the server was invalid - try refreshing the page'
    });
  } else {

    console.log('Success - Confirmed Peers List: ', peerPool.confirmedConnectedPeers.length, peerPool.confirmedConnectedPeers);

    // io.sockets.emit('peer_pool', peerPool.confirmedConnectedPeers);
    res.send(200);
  }
});

router.post('/callPeer', function(req, res) {
  var requestID = req.body.id;
  var secret = req.body.secret;
  var calleeID = req.body.callee_id;
  var success = false;

  console.log(new Date(), 'Request to call from [', requestID, '] to [', calleeID, ']');

  if (requestID && calleeID) {

    if (requestID === calleeID) {
      success = false;
    } else {
      success = peerPool.requestConnectPeer(requestID, calleeID, secret);
    }
  }

  if (!requestID || !calleeID || !success) {
    res.send(400, {
      error: 'Cannot connect to Peer ID: ' + calleeID
    });
  } else {
    // io.sockets.emit('peer_pool', peerPool.confirmedConnectedPeers);
    res.send(200, {
      peerID: calleeID
    });
  }
});

router.post('/callRandom', function(req, res) {
  var requestID = req.body.id;
  var secret = req.body.secret;
  var peerID = -1;

  console.log(new Date(), 'Request to connect ', requestID, ' to RANDOM peer...');

  if (requestID) {
    peerID = peerPool.requestRandomPeer(requestID, secret);
  }

  if (!requestID || peerID === -1) {
    console.log('Failure: Can\'t get random peer for [', requestID, ']');
    res.send(400, {
      error: 'Not enough peers or invalid peer ID'
    });
  } else {
    console.log('Success: Connect [', requestID, '] to [', peerID, '] --> Pool of peers after: ', peerPool.confirmedConnectedPeers);

    // io.sockets.emit('peer_pool', peerPool.confirmedConnectedPeers);
    res.send(200, {
      peerID: peerID
    });
  }
});

router.post('/endCall', function(req, res) {
    var requestID = req.body.id;
    var secret = req.body.secret;
    var confirmed = false;

    console.log(new Date(), 'Request to return ', requestID, ' to connected peers');

    if (requestID) {
      confirmed = peerPool.confirmPeer(requestID, secret);
    }

    if (!requestID || !confirmed) {
      res.send(400, {
        error: 'Invalid Peer ID: ' + requestID
      });
    } else {
      // io.sockets.emit('peer_pool', peerPool.confirmedConnectedPeers);
      console.log('Success - Confirmed Peers List: ', peerPool.confirmedConnectedPeers.length, peerPool.confirmedConnectedPeers);
      res.send(200);
    }
  });

module.exports = router;
