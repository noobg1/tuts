const http = require('http');
const axios = require('axios');


const requestListener = function (request, response) {
  console.log(request);
  axios.get('http://www.google.com')
    .then(function (result) {
      response.end(result.data);
    });
};
const server = http.createServer(requestListener);
server.listen(8001);