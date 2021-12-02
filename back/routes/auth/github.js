const express = require('express');
const passport = require('passport');
const router = express.Router();
const strategy_name = 'github';

router.get('/github/auth', passport.authenticate(strategy_name, { session:false, scope: [ 'user:email', 'read:user' ]}));

router.get('/github/connect', function (req, res, next) {
  /* Connects the current user account with Google. */

  // TODO: This route must be private, implement a middleware to check the authorization.

  console.log("New request GET to /github/connect");

  const user_id = 1;  // TODO: get the user id from the token
  const state = `${user_id}`;  // state must be string

  // redirect to github to authenticate
  passport.authenticate(strategy_name, { session:false, scope: [ 'user:email' ], state: state })(req, res, next);

});

router.get('/github/callback', passport.authenticate(strategy_name, {  session:false, failureRedirect: '/failed' }),
  function(req, res) {
    /*
    Successful authentication.
    Google correctly authenticated the user and defined the following variables for us:

    req.user : json
      A json object with the github account data. You can use the req.user._json data.
    req.query.state : string or null
      The user id that we sent to github to connect our account with the Google account.

    This route is not an API route, it came from the browser redirection,
    so it should redirects to some frontend route.
    */

    console.log("New request GET to /github/callback");
    console.log(req.user);
    const github_data = req.user._json;
    const user_id = req.query.state;
    console.log(`state: ${user_id}`);

    if (user_id){
      console.log(`Connect the github account to the user ${user_id}`);
      // TODO: create the relation between user and provider for user_id and provider(github_data)
    }else{
      console.log(`This is a login event. Check in the database if exists some user with this github account.
        Login if exists, otherwise create a new user and connect with the github account`);
      // TODO: Check if exists a user with this github account and log in him.
      // TODO: If not exists, create the user and create the relation
      //       between user and provider for user_id and provider(github_data)
    }

    const user = {id: 1, name: "Mauricio"};  // TODO: get the user data for the created or connected user

    // TODO: generate a new token for login
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

    const url_front = `http://localhost:5500/?token=${token}`;

    res.redirect(301, url_front);

    // let data = {
    //   'success': true,
    //   'message': `Authentication or connection successfully created for the user ${user_id}`,
    //   'data': user
    // }
    // res.json(data)
  }
);

module.exports = router;