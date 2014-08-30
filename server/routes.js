/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var stripe = require('stripe')('sk_test_GMwkILlkJgbxJ7r6HQSEHdfw');
var bodyParser = require('body-parser');
var User = require('./api/user/user.model');


module.exports = function(app) {

  // Insert routes below

  app.use('/api/queues', require('./api/queue'));
  app.use('/api/games', require('./api/game'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));
  app.use('/auth', require('./auth'));

  app.use(bodyParser.urlencoded({
    extended: true
  }));
//charge authenticated user + increment credits via stripe.js, more complicated than stripe checkout
  // app.post('/charge', function(req, res) {
  //   console.log("req.body", req.body)
  //   var stripeToken = req.body.stripeToken;
  //   var userId = req.body.userId;
  //   var amount = 100;

  //   stripe.charges.create({
  //     card: stripeToken,
  //     currency: 'usd',
  //     amount: amount
  //   },

  //    function(err, charge) {
  //     if (err) {
  //       res.status(500, err).end();
  //     } else {
  //           User.update({
  //           _id: userId
  //   }, {
  //       $inc: {credits: 1}
  //   }, function(err, user) {
  //       if (err) {return next(err);
  //             }
  //       if (!user) {return res.json(401);
  //             }
  //       res.json(user);
  //   });
  //        }
  //     }
  //   )
  // })

/**use with stripe checkout*/
  app.post('/charge', function(req, res) {
    console.log("req.body: ", req.body)

    var creditsParam = "";
    var stripeToken = req.body.stripeToken;
    var userId = req.body.userId;

    req.body.numCredits > 0?
    creditsParam = req.body.numCredits:
    creditsParam = 1;

    var amount = creditsParam * 99;

    console.log("amount", amount);

    stripe.charges.create({
      card: stripeToken,
      currency: 'usd',
      amount: amount
    },
    function(err, charge) {
      if (err) {
        res.status(500, err).end();
      } else {
        console.log("success");
        User.update({
            _id: userId
          }, {
            $inc:{credits: creditsParam}
          }, function(err, user) {
            res.status(204).end();
          }
        );
      }
    });
  });





  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
;
