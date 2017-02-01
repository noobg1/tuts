var fs = require('fs');

function listFiles(directory, extensionName, callback) {
  
  function filterExternsion(file) {
    if (file.split('.')[1] === extensionName)
      return file;
  }

  fs.readdir(directory, function (error, list) {
    if (error) callback(error, null);
    else {
      var filteredList = list.filter(filterExternsion);
      callback(null, filteredList);
    }
  });
}

module.exports = listFiles;