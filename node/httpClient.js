var url = process.argv[2];
var http = require('http');

http.get(url, function(response) {
  
  response.on('data', function (chunk) {
    console.log(chunk.toString());
  });

}).on('error', function(error) {
  consolerror.log('Got error: ' + error.message);
});