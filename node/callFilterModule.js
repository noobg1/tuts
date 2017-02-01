var filterModule = require('./filteredLSModule');
var fs = require('fs');
var directory = process.argv[2];
var extensionName = process.argv[3];

function isValidDirectory(directory) {
  if (!fs.existsSync(directory)) {
    console.log('Directory input is invalid');
    return false;
  }
  return true;
}

function getFilteredFileList(error, list) {
  if (error) console.error('There was an error:' + error);
  else {
    for (var iter = 0; iter < list.length; iter++) {
      console.log(list[iter]);
    }
  }
}

if (!isValidDirectory(directory)) {
    return;
  }
  
filterModule(directory, extensionName, getFilteredFileList);