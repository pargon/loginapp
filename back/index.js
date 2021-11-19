const express = require('express');
const app = express();
const port = 3000;

app.get('/', function(req, res) {
  console.log("New request GET to /");
  res.send('Hola Mundo!');
});

app.listen(port, function() {
  console.log(`App listening the port [${port}]!`);
});



