var express = require('express');
var bodyParser = require('body-parser');
//use request to make external API call in express server
var request = require('request');
//https://stackoverflow.com/questions/39301227/external-api-calls-with-express-node-js-and-require-module
var port = 3000;
var app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

//https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=2
app.post('/', function(req, res) {
  // console.log(req.body.crypto);
  var crypto = req.body.crypto; //bitcoin type
  var fiat = req.body.fiat; //currency
  var amount = req.body.amount;
  // var baseURL = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/';
  // var finalURL = baseURL + crypto + fiat;
  // console.log(finalURL);
  var options = {
    url: 'https://apiv2.bitcoinaverage.com/convert/global',
    method: 'GET',
    qs: {
      from: crypto,
      to: fiat,
      amount: amount
    }
  }

  request(options, function(error, request, body) {
    // console.log('body =', body);
    var data = JSON.parse(body);
    // var price = data.last;
    // var currentDate = data.display_timestamp;
    // console.log('data.price =', data.price);
    // console.log('currentDate = ', currentDate);
    var price = data.price;
    var currentDate = data.time;
    //sending html must be in ''
    // res.send('<h1>The price of' + crypto + 'is' + price + fiat +'</h1>')
    //send more than one line(thing) need to use res.write()
    //then res.send() at last, once .send, it's done, coz include res.end
    res.write('<p>The current date is ' + currentDate + '</p>');
    // res.write('<h1>The current price of ' + crypto + ' is ' + price + ' ' + fiat + '</h1>');
    res.write('<h1>' + amount + crypto + ' is currently ' + price + fiat + '</h1>');
    res.send();
  });
});

app.listen(port, function() {
  console.log('listening to ' + port);
});
