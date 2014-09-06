'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:       process.env.OPENSHIFT_NODEJS_IP ||
            process.env.IP ||
            undefined,

  // Server port
  port:     process.env.PORT ||
            80,

  // MongoDB connection options
  mongo: {  'mongodb://localhost/clawfront' ||
    uri:    'mongodb://104.131.2.169/clawFront' ||
            process.env.MONGOHQ_URL ||
            process.env.OPENSHIFT_MONGODB_DB_URL+process.env.OPENSHIFT_APP_NAME 
            
  }
};