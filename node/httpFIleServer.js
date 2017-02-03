var http = require('http')
var fs = require('fs');
var port = process.argv[2];
var source = process.argv[3];

var server = http.createServer(function (request, response) {
  var readStream = fs.createReadStream(source);

  readStream.on('open', function () {
    readStream.pipe(response);
  });
  readStream.on('error', function (error) {
    response.end(error);
  });

})

server.listen(port);