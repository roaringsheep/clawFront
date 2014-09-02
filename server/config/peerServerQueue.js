/**
 * Error responses
 */

'use strict';


module.exports = (function peerServerQueue() {

  var PeerServer = require('peer').PeerServer;
  var peerPool = require('./peerPool');

  var setup = function(port, ioSocket) {
    var peerServer = new PeerServer({
      port: port,
      path: '/'
    });

    peerServer.on('connection', function(id) {
      console.log(new Date(), '++Connection from ', id);

      peerPool.addPeerToPool(id);

      console.log('\tAll Connected Peers ==>', peerPool.allConnectedPeers);
      console.log('\tConfirmed Peers ==>', peerPool.confirmedConnectedPeers);
    });

    peerServer.on('disconnect', function(id) {
      console.log(new Date(), '--Disconnect of ', id);

      peerPool.removePeerFromPool(id);

      console.log('\tAll Connected Peers ==>', peerPool.allConnectedPeers);
      console.log('\tConfirmed Peers ==>', peerPool.confirmedConnectedPeers);

      // ioSocket.sockets.emit('peer_pool', peerPool.confirmedConnectedPeers);
    });
  };

  return {
    setup: setup
  };

})();
