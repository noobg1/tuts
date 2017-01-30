var url = process.argv[2];
var http = require('http');

http.get(url, function(res) {
  console.log("Got response: " + res.on('data'), function (data) {
    console.log(data.toString());
  });
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});