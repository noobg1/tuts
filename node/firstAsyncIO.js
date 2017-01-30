var fs = require('fs');
var directory = process.argv[2];
try {
  fs.readFile(directory, function (error, data) {
    if (error) throw error;
    var numberOflines = data.toString().split('\n').length - 1
    console.log(numberOflines);
  });
}
catch (error) {
  console.log(`Error Ocurred: ${error}`);
}