var http = require('http')
var fs = require('fs');
var port = process.argv[2];
var map = require('through2-map');


var server = http.createServer(function (request, response) {
  request
        .pipe(map(function (chunk) {
            return chunk.toString().toUpperCase()
        }));
})

server.listen(port);