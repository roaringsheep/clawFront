'use strict';

var _ = require('lodash');
var Game = require('./game.model');
var request = require('request');
var piSocket = require('./game.socket')

//Get list of games
exports.index = function(req, res) {
    Game.find(function(err, games) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, games);
    });
};

var ports = [{
    num: 8,
    port: '22',
    state: 'off'
}, {
    num: 7,
    port: '18',
    state: 'off'
}, {
    num: 6,
    port: '16',
    state: 'off'
}, {
    num: 5,
    port: '15',
    state: 'off'
}, {
    num: 4,
    port: '13',
    state: 'off'
}, {
    num: 3,
    port: '11',
    state: 'off'
}, {
    num: 2,
    port: '12',
    state: 'off'
}, {
    num: 1,
    port: '7',
    state: 'off'
}];


var moves = {
    forw: [
        [2], 'on'
    ],
    fclear: [
        [2], 'off'
    ],
    back: [
        [1, 7], 'on'
    ],
    bclear: [
        [1, 7], 'off'
    ],
    left: [
        [4], 'on'
    ],
    lclear: [
        [4], 'off'
    ],
    right: [
        [3, 8], 'on'
    ],
    rclear: [
        [3, 8], 'off'
    ],
    lower: [
        [5], 'on'
    ],
    loclear: [
        [5], 'off'
    ],
    raise: [
        [6], 'on'
    ],
    raclear: [
        [6], 'off'
    ],
    clear: [
        [1, 2, 3, 4, 5, 6, 7, 8], 'off'
    ]
};

var findPortByNum = function(num) {
    for (var i = 0; i < ports.length; i++) {
        if (ports[i].num == num) {
            return ports[i];
        }
    }
}

var togglePorts = function(portArr, state) {
    var poke = "";
    for (var i = 0; i < portArr.length; i++) {
        var port = findPortByNum(portArr[i]);
        port.state = state;
        if (i == portArr.length - 1) {
            poke += port.port + ',' + state;
        } else {
            poke += port.port + ',' + state + ',';
        }
    }
    return poke
}

exports.pokePi = function(req, res) {
    console.log('gotit', req.body);
    var url = 'http://192.168.1.66:3000/';
    var reqedMoves = req.body.move.split(',');
    var portsinst = ""
    for(var i=0; i<reqedMoves.length; i++){
        var theMove = moves[reqedMoves[i]];
        if(i == reqedMoves.length-1){
            portsinst += togglePorts(theMove[0], theMove[1]);
        } else {
            portsinst += togglePorts(theMove[0], theMove[1]) + ',';
        }
    }
    var sendingToPi = portsinst;
    console.log('poking pi', "I'm sending this:", sendingToPi);
    piSocket.emitToPi('move',sendingToPi);
    // request({
    //     url: url,
    //     method: 'POST',
    //     json: sendingToPi
    // }, function(err, message, res) {
    //     if (err) {
    //         return console.log(err);
    //     }
    //     console.log(res);
    // });
    res.send(200);
};

// Get a single game
exports.show = function(req, res) {
    Game.findById(req.params.id, function(err, game) {
        if (err) {
            return handleError(res, err);
        }
        if (!game) {
            return res.send(404);
        }
        return res.json(game);
    });
};

// Creates a new game in the DB.
exports.create = function(req, res) {
    Game.create(req.body, function(err, game) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(201, game);
    });
};

// Updates an existing game in the DB.
exports.update = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Game.findById(req.params.id, function(err, game) {
        if (err) {
            return handleError(res, err);
        }
        if (!game) {
            return res.send(404);
        }
        var updated = _.merge(game, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, game);
        });
    });
};

// Deletes a game from the DB.
exports.destroy = function(req, res) {
    Game.findById(req.params.id, function(err, game) {
        if (err) {
            return handleError(res, err);
        }
        if (!game) {
            return res.send(404);
        }
        game.remove(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.send(204);
        });
    });
};

function handleError(res, err) {
    return res.send(500, err);
}
