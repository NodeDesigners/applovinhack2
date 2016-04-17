'use strict'

const express = require('express');
const app = express();
const port = 9001;
const morgan = require('morgan');

app.use(express.static(__dirname + './../client/'));
app.use(morgan('dev'));

app.get('/items', function(req, res){
  console.log('GET request received');
  res.send('Hello, world!');
});

app.listen(port, function(){
  console.log(`Now listening on port ${port}`);
});
