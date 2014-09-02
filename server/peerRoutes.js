'use strict';

var express = require('express');
var router = express.Router();

var peerPool = require('./config/peerPool');
var auth = require('./auth/auth.service');

router.post('/confirmID', auth.isAuthenticated(), function(req, res) {
  var requestID = req.body.id;
  var secret = req.body.secret;
  var added = false;

  console.log('Req user is: ', req.user);

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

    if (typeof req.user !== 'undefined' && req.user.role === 'admin') {
      peerPool.setMasterPeerID(requestID);
      console.log(new Date(), 'Set -> Master Peer ID is: ', requestID);
      res.send(200, { isMaster: true });
    } else {
      // io.sockets.emit('peer_pool', peerPool.confirmedConnectedPeers);
      res.send(200, { isMaster: false });
    }
  }

});

router.post('/callMaster', function(req, res) {
  var masterPeerID = peerPool.getMasterPeerID();
  if (masterPeerID === null) {
    res.send(400, {
      error: 'No Master Peer ID exists or it is currently unavailable'
    });
  } else {
    var requestID = req.body.id;
    var secret = req.body.secret;
    var success = false;

    console.log(new Date(), 'Request to call from [', requestID, '] to MASTER [', masterPeerID, ']');

    if (requestID === masterPeerID) {
      success = false;
    } else {
      success = peerPool.requestConnectPeer(requestID, masterPeerID, secret);
    }

    if (!masterPeerID) {
      res.send(400, {
        error: 'Cannot connect to Master Peer ID: Master is not connected'
      });
    } else if (!requestID || !success) {
      res.send(400, {
        error: 'Cannot connect to Master Peer ID: Master is busy'
      });
    } else {
      // io.sockets.emit('peer_pool', peerPool.confirmedConnectedPeers);
      res.send(200, {
        peerID: masterPeerID
      });
    }
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

  // var masterPeerID = peerPool.getMasterPeerID();

  // // Master disconnected, remove it
  // if (masterPeerID === requestID) {
  //   peerPool.setMasterPeerID(null);
  // }

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
