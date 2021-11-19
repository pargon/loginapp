const express = require('express');
const app = express();
const port = 3000;

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Add headers before the routes are defined
app.use(function (req, res, next) {

    res.setHeader('Content-Type', 'application/json');

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.get('/', function(req, res) {
  console.log("New request GET to /");
  res.send('Hola Mundo!');
});

app.post('/login', function(req, res) {

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

app.listen(port, function() {
  console.log(`App listening the port [${port}]!`);
});



