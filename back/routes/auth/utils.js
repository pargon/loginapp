const passport = require('passport');


function passport_connect(strategy_name, strategy_scope, req, res, next) {

  const user_id = req.user.id;
  const state = `${user_id}`;  // state must be string

  // redirect to strategy to authenticate
  let passport_authenticate = passport.authenticate(
    strategy_name, { session:false, scope: strategy_scope, state: state }
  );
  passport_authenticate(req, res, next);
}

module.exports = { passport_connect };
