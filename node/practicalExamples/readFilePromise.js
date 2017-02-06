var fs = require('fs');
var directory = process.argv[2];

let readFile = new Promise(function (resolve, reject) {
  fs.readFile(directory, function (error, data) {
    if (error) reject(error);
    var numberOflines = data.toString().split('\n').length - 1
    console.log(numberOflines);
    resolve(data);
  });
});

readFile.then(function (data) {
  console.log(data.toString());
  })
  .catch(function (error) {
    console.log(error);
  });



