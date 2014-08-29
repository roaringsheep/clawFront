/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

var stripe = require('stripe')('sk_test_GMwkILlkJgbxJ7r6HQSEHdfw');
var bodyParser = require('body-parser');

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

  app.post('/charge', function(req, res) {
    var stripeToken = req.body.stripeToken;
    var amount = 100;

    stripe.charges.create({
      card: stripeToken,
      currency: 'usd',
      amount: amount
    },
    function(err, charge) {
      if (err) {
        res.status(500, err).end();
      } else {
        res.status(204).end();
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
