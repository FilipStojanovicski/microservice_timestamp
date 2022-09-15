// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const utc_date_re = /^\d{4}-\d{2}-\d{2}$/
const unix_date_re = /^\d+$/
// your first API endpoint... 
app.get("/api/:timestamp", function (req, res) {
  result = {}
  if (req.params.timestamp.match(utc_date_re)){
    console.log("UTC");
    var date = new Date(req.params.timestamp);
    result.unix = Math.floor(date.getTime());
    result.utc = date.toUTCString();
    res.json(result);
  }
  else if (req.params.timestamp.match(unix_date_re)){
    console.log("Unix");
    result.unix = parseInt(req.params.timestamp);
    var date = new Date(parseInt(req.params.timestamp));
    result.utc = date.toUTCString();
    res.json(result)
  }
  else{
    res.json({error: "Invalid Date"})
  }

});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
