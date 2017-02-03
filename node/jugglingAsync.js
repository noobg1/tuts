'use strict';

let url = process.argv.slice(2);
let http = require('http');
var bl = require('bl');

http.get(url[0], function(response) {
  response.pipe(bl(function (err, data) {
     console.log(data.toString())
     }));

        http.get(url[1], function(response) {
          response.pipe(bl(function (err, data) { 
            console.log(data.toString())
            }));

              http.get(url[2], function(response) {
                  response.pipe(bl(function (err, data){
                    console.log(data.toString())
                    }));
                });
        });
});

