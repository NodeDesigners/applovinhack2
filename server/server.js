'use strict'

const express = require('express');
const app = express();
const port = 9001;
const morgan = require('morgan');
var bodyParser = require('body-parser');
var Twit = require('twit')

app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
app.use(express.static(__dirname + './../client/'));
app.use(morgan('dev'));


var T = new Twit({
  consumer_key:         'r4RZCNQpAok6maL6nmQfxbzob',
  consumer_secret:      '3ejAD0iN9rJjFmZBXQ7sIZhMTdOOGNkdDu2czIDp58CHdG4nj7',
  access_token:         '2992542397-PKBi9egkOqVRQZf6eI71aMtmzxHDmXBDUzAusBM',
  access_token_secret:  '9RIcbywvijjYZAAfeF4yhFHTkO99ywYyiOY01fb5SkfAk',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})



app.post('/tweet', function(req, res){
    console.log(req.body)
    var message = req.body.message;
T.post('statuses/update', { status: message }, function(err, data, response) {
  console.log(data)
  res.send(data)
})

  
});

app.post('/tweetIMG', function(req, res){
    console.log(req.body)
    var message = req.body.message;
    var image = req.body.image;
T.post('statuses/update', { status: message +" "+ image }, function(err, data, response) {
  console.log(data)
  res.send(data)
})
  
});


app.get('/items', function(req, res){
  console.log('GET request received');
  res.send('Hello, world!');
});

app.listen(port, function(){
  console.log(`Now listening on port ${port}`);
});
