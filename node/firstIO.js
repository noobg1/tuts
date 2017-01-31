var fs = require('fs');
var path = require('path');
var directoryName = process.argv[2];
var fileLimit = 10;


if (directoryName === undefined) {
 console.log(`Expected .txt file as third argument, given none!`);
 return `Expected .txt file as third argument, given none!`;
}
if (path.extname(directoryName) !== '.txt') {
 console.log(`Expected .txt file as third argument, given: ${path.extname(directoryName)}`);
 return `Expected .txt file as third argument, given: ${path.extname(directoryName)}`;
}
var stats = fs.statSync(directoryName);
var fileSizeInBytes = stats["size"]/1000;
//console.log(fileSizeInBytes)

if(fileSizeInBytes > fileLimit){
 console.log(`Expected .txt file as third argument less than ${fileLimit} kbs, given ${fileSizeInBytes}!`);
 return `Expected .txt file as third argument less than ${fileLimit} kbs, given ${fileSizeInBytes/1024}!`;
}

fs.readFile(directoryName, function fileRead(error, data) {
 if (error) {
   console.log(error);
 }
 else {
   var fileMessage = data.toString();
   var fileMessageArray = fileMessage.split('\n');
   var newLineCharacters = (fileMessageArray.length) - 1;
   console.log(newLineCharacters);
 }
});

// var fs = require('fs');
// try {
//   var buffer = fs.readFileSync(process.argv[2]);
//   var text = buffer.toString().split('\n');

//   console.log(text.length - 1);
// } catch (error) {
//   console.log(error);
// }

