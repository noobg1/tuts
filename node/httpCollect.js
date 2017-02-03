'use strict';

let url = process.argv[2];
let http = require('http');
var bl = require('bl');

http.get(url, function(response) {
  response.pipe(bl(function (err, data) { 
    console.log(data.toString().length);
     console.log(data.toString())
     }));
});

