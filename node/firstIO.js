var fs = require('fs');
try {
  var buffer = fs.readFileSync(process.argv[2]);
  var text = buffer.toString().split('\n');

  console.log(text.length - 1);
} catch (error) {
  console.log(error);
}

