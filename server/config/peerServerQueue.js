/**
 * Error responses
 */

'use strict';

module.exports = (function peerServerQueue() {

  var PeerServer = require('peer').PeerServer;

  var setup = function(port, ioSocket) {
    var peerServer = new PeerServer({
      port: port,
      path: '/'
    });

    console.log(peerServer);
    // peerServer.get('/', function(req, res, next) {
    //   console.log(req);
    //   // userSave.find({}, function(error, users) {
    //   //   res.send(users)
    //   // })
    // })

    var masterPeerID = null;

    peerServer.on('connection', function(id) {
      console.log(new Date(), '++Connection from ', id);

      // peerPool.addPeerToPool(id);

      // console.log('\tAll Connected Peers ==>', peerPool.allConnectedPeers);
      // console.log('\tConfirmed Peers ==>', peerPool.confirmedConnectedPeers);
    });

    peerServer.on('disconnect', function(id) {
      console.log(new Date(), '--Disconnect of ', id);

      // peerPool.removePeerFromPool(id);

      // console.log('\tAll Connected Peers ==>', peerPool.allConnectedPeers);
      // console.log('\tConfirmed Peers ==>', peerPool.confirmedConnectedPeers);

      // ioSocket.sockets.emit('peer_pool', peerPool.confirmedConnectedPeers);
    });
  };

  return {
    setup: setup
  };

})();
