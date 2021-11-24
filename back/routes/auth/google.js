const express = require('express');
const passport = require('passport');
const router = express.Router();
const strategy_name = 'google';

router.get('/google/auth', passport.authenticate(strategy_name, { session:false, scope: ['profile', 'email']}));

router.get('/google/connect', function (req, res, next) {
  /* Connects the current user account with Google. */

  // TODO: This route must be private, implement a middleware to check the authorization.

  console.log("New request GET to /google/connect");

  const user_id = 1;  // get the user id from the token
  const state = `${user_id}`;  // state must be string

  // redirect to google to authenticate
  passport.authenticate(strategy_name, { session:false, scope: ['profile', 'email'], state: state })(req, res, next);

});

router.get('/google/callback', passport.authenticate(strategy_name, {  session:false, failureRedirect: '/failed' }),
  function(req, res) {
    /*
    Successful authentication.
    Google correctly authenticated the user and defined the following variables for us:

    req.user : json
      A json object with the google account data. You can use the req.user._json data.
    req.query.state : string or null
      The user id that we sent to google to connect our account with the Google account.

    This route is not an API route, it came from the browser redirection,
    so it should redirects to some frontend route.
    */

    console.log("New request GET to /google/callback");
    const google_data = req.user._json;
    const user_id = req.query.state;

    if (user_id){
      console.log(`Connect the google account to the user ${user_id}`);
      // TODO: create the relation between user and provider for user_id and provider(google_data)
    }else{
      console.log(`This is a login event. Check in the database if exists some user with this google account.
        Login if exists, otherwise create a new user and connect with the google account`);
      // TODO: Check if exists a user with this google account and log in him.
      // TODO: If not exists, create the user and create the relation
      //       between user and provider for user_id and provider(google_data)
    }

    const user = {id: 1, name: "Mauricio"};  // TODO: get the user data for the created or connected user

    let data = {
      'success': true,
      'message': `Authentication or connection successfully created for the user ${user_id}`,
      'data': user
    }
    res.json(data)
  }
);

module.exports = router;