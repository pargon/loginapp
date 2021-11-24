const express = require('express');
const router = express.Router();
const google = require('./google');
// const facebook = require('./facebook');  // You can create new strategies 

router.post('/login', function(req, res) {

  console.log("New request POST to /login");
  
  console.log(req.body)

  // work with data...

  let data = {
    'success': true,
    'message': `User ${req.body.name} registered correctly`,
    'data': req.body
  }

  res.json(data);
});

router.get('/failed', (req, res) => res.send('You Failed to log in!'))

router.use('', google);
// router.use('', facebook);

module.exports = router
