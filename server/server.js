'use strict'

const express = require('express');
const app = express();
const port =  process.env.PORT || 9001;
const morgan = require('morgan');
var bodyParser = require('body-parser');
var Twit = require('twit')

app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
app.use(express.static(__dirname + './../client/'));
app.use(morgan('dev'));


var T = new Twit({
consumer_key:         __CONSUMER__KEY__,
consumer_secret:      __CONSUMER__SECRET__,
access_token:         __ACCESS__TOKEN__,
access_token_secret:  __TOKEN__SECRET__,
timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})



app.post('/tweet', function (req, res) {
 var message = JSON.parse(Object.keys(req.body)[0]).message
 console.log(message);
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
