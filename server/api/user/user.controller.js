'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var validationError = function(res, err) {
    return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
    User.find({}, '-salt -hashedPassword', function(err, users) {
        if (err) return res.send(500, err);
        res.json(200, users);
    });
};

exports.pwcheck = function(req, res) {
    async.waterfall([
        function(done) {
            crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
                done(err, token)
            });
        },
        function(token, done) {
            User.findOne({email: req.body.email}, function(err, user) {
                if (!user) {
                    console.log('didnot find user');
                    res.send("nouser");
                } else {
                    console.log('found!');
                    user.resetPasswordToken = token;
                    user.resetPasswordExpires = Date.now() + 3600000;
                    user.save(function(err){
                        done(err,token,user);
                    })
                }
            });
        },
        function(token, user, done){
            var transport = nodemailer.createTransport(smtpTransport({
                service:'gmail',
                auth: {
                    user: 'arcadewebclaw@gmail.com',
                    pass: 'WebArcadeClaw'
                }
            }));
            var mailOptions = {
                to: user.email,
                from: 'pwrecovery@arcadeclaw.com',
                subject: 'Arcade Claw Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account. \n\n'+ 'Please click on the following link, or paste this into your browser to complete the process:\n\n' + 'http://'+req.headers.host +'/reset/'+token+'\n\n'+'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            transport.sendMail(mailOptions, function(err){
                done(err, 'done');
            });
        }
    ], function(err){
        if(err) {
            console.log('err',err);
            res.status(500).send(err);
        }
        res.send('done');
    })
};


exports.reset = function(req,res,next){
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}}, function(err, user){
        if(!user){
            res.send('nope');
        } else {
            res.send(user);
        }
    })
}

exports.resetPassword = function(req, res){
    console.log('req',req.body, 'req.params',req.params);
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}}, function(err, user){
        if (!user) {
            res.status(200).send('nope');
        } else {
            user.password = req.body.password;
            user.resetPasswordExpires = undefined;
            user.resetPasswordToken = undefined;
            user.save(function(err){
                if(err) console.log('reset Password error',err);
                res.status(200).send('done');
            })
        }
    })
}

/**
 * Creates a new user
 */
exports.create = function(req, res, next) {
    var newUser = new User(req.body);
    newUser.provider = 'local';
    newUser.role = 'user';
    newUser.save(function(err, user) {
        if (err) return validationError(res, err);
        var token = jwt.sign({
            _id: user._id
        }, config.secrets.session, {
            expiresInMinutes: 60 * 5
        });
        res.json({
            token: token
        });
    });
};

/**
 * Get a single user
 */
exports.show = function(req, res, next) {
    var userId = req.params.id;

    User.findById(userId, function(err, user) {
        if (err) return next(err);
        if (!user) return res.send(401);
        res.json(user.profile);
    });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err, user) {
        if (err) return res.send(500, err);
        return res.send(204);
    });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
    var userId = req.user._id;
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);

    User.findById(userId, function(err, user) {
        if (user.authenticate(oldPass)) {
            user.password = newPass;
            user.save(function(err) {
                if (err) return validationError(res, err);
                res.send(200);
            });
        } else {
            res.send(403);
        }
    });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
    var userId = req.user._id;
    User.findOne({
        _id: userId
    }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
        if (err) return next(err);
        if (!user) return res.json(401);
        res.json(user);
    });
};

/* Universal put. Use to add credit(s) after Stripe payment is made, toggle inQueue and isPlaying properties*/

exports.update = function(req, res, next) {
    var userId = req.params.id;
    console.log(req.body);
    User.update({
        _id: userId
    }, {
        credits: req.body.credits,
        isPlaying: req.body.isPlaying,
        inQueue: req.body.inQueue
    }, function(err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.json(401);
        }
        res.json(user);
    });
}


/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
    res.redirect('/');
};
