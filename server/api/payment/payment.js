'use strict';

// Set secret key. Change from test key to live key.
var stripe = require("stripe")("sk_test_GMwkILlkJgbxJ7r6HQSEHdfw");

// Get token created by Stripe API
var stripeToken = request.body.stripeToken;

var charge = stripe.charges.create({
    amount: 100, // amount in cents, again
    currency: "usd",
    card: stripeToken,
    description: "payinguser@example.com"
  }, function(err, charge) {
    if (err && err.type === 'StripeCardError') {
      // The card has been declined
      console.log("Card has been declined.");
    }
  }
);