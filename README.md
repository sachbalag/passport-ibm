# Passport-IBM

[Passport](http://passportjs.org/) strategy for authenticating 
with [IBM Tivoli Federated Identity Manager (TFIM)]
(www.ibm.com/software/products/en/federated-identity-mgr)
using OpenID 2.0.

This module lets you authenticate using TFIM in your Node.js applications.
By plugging into Passport, TFIM authentication can be integrated into 
any application or framework that supports or impements
[Express](http://expressjs.com/).

## Installing

$ npm install --save passport-ibm

## How to use this module

#### Configuring the strategy

The IBM authentication strategy authenticates users who have an IBM ID
which is also their OpenID 2.0 identifier. The strategy requires the developer
to implement a callback, which accepts the IBM ID (identifier), calls 'done'
and injects a 'user' object.
Options can also be supplied to specify a return URL, a realm and
profile exchange which defaults to true.

    passport.use('ibm', new IBMStrategy({

           returnURL: 'http://localhost.ibmserviceengage.com:3005/auth/ibm/return',
           realm: 'http://localhost.ibmserviceengage.com:3005/'
        },

        //Callback
        function(identifier, profile, done) {
            // asynchronous check
            process.nextTick(function () 
            {
              console.log("*** Identifier *** "+identifier);
              console.log("*** Email ***"+profile.emails[0].value);
              return done(null, { identifier: profile});
            });
        }

#### Authenticate Requests

Use passport.authenticate() and specify the `'ibm'` strategy, to
authenticate requests.

Here is an example for route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/auth', passport.authenticate('ibm'),function (req, res) 
    {
        res.status(200).end();
    });
    
    // This is the return URL called by Passport
    app.get('/auth/ibm/return', 
      passport.authenticate('ibm', { failureRedirect: '/loginpage' }),
      function(req, res) {
        // Success ... redirect to main page.
        res.redirect('/');
      });


## Contact

  - [Sachin Balagopalan](sachin.balagopalan@us.ibm.com)

## License

(C) Copyright IBM Corp. 2015 All Rights Reserved