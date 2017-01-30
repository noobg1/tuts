var filterModule = require('./filteredLSModule');
var directory = process.argv[2];
var extensionName = process.argv[2];

function getFilteredFileList(error, list) {
  if (error) console.error('There was an error:', error);
  else {
    for (var iter = 0; iter < list.length; iter++) {
      console.log(list[iter]);
    }
  }
}


filterModule(directory, extensionName, getFilteredFileList);