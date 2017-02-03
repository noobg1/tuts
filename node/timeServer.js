let net = require('net');
var strftime = require('strftime')
let port = process.argv[2];

let server = net.createServer(function(socket) { 
  socket.write(strftime('%F %H:%M')+'\n');
  socket.end();
});


server.listen(port);