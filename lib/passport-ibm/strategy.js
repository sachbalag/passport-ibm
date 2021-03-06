/**
 * Dependencies for this Module.
 */
var util = require('util')
  , OpenIDStrategy = require('passport-openid').Strategy;


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