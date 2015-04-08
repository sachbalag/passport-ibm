/**
 * Dependencies for this Module.
 */
var util = require('util')
  , OpenIDStrategy = require('passport-openid').Strategy;


/**
 * `Strategy` constructor.
 *
 * The IBM authentication strategy authenticates requests by delegating to
 * the Tivoli Federated Identity Manager (TFIM) using the OpenID 2.0 protocol.
 *
 * Applications must supply a callback which accepts an `identifier`,
 * and optionally a service-specific `profile`, and then calls the `done`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occured, `err` should be set.
 *
 * Options:
 *   - `returnURL`  URL to which TFIM will redirect the user after authentication
 *   - `realm`      the part of URL-space for which an OpenID authentication request is valid
 *   - `profile`    enable profile exchange, defaults to true
 *
 * Examples:
 *
 *     passport.use('ibm', new IBMStrategy({

 *          returnURL: 'http://localhost.ibmserviceengage.com:3005/auth/openid/return',
 *          realm: 'http://localhost.ibmserviceengage.com:3005/'
 *       },

 *       function(identifier, profile, done) {
 *           // asynchronous check
 *           process.nextTick(function () 
 *           {
 *             console.log("*** Identifier *** "+identifier);
 *             console.log("*** Email ***"+profile.emails[0].value);
 *             return done(null, { identifier: profile});
 *           });
 *       }
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function Strategy(options, validate) 
{
  // If user did not override set it to these ...
  options = options || {};
  //console.log("*********** INSIDE IBM STRATEGY CONSTRUCTOR *****"+options);
  options.providerURL = options.providerURL || 'https://connect.ibmserviceengage.com/blueid';   // IBM TFIM OpenID provider
  options.profile =  (options.profile === undefined) ? true : options.profile;
  OpenIDStrategy.call(this, options, validate);
  this.name = 'ibm';

}

/**
 * Inherit from OpenIDStrategy so we can expose our implementation.
 */
util.inherits(Strategy, OpenIDStrategy);


/**
 * Expose Strategy to the outside world,
 */ 
module.exports = Strategy;