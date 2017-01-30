var fs = require('fs');
var directory = process.argv[2];
var extensionName = process.argv[3];

function filterExternsion(file) {
  if (file.split('.')[1] === extensionName)
    return file;
}

fs.readdir(directory, function (error, list) {
  try {
    if (error) throw error;
    var filteredList = list.filter(filterExternsion);
    for (var iter = 0; iter < filteredList.length; iter++) {
      console.log(filteredList[iter]);
    }
  }
  catch (error) {
    console.log(`Error Ocurred: ${error}`);
  }

})




// var fs = require('fs')
//     var path = require('path')

//     var folder = process.argv[2]
//     var ext = '.' + process.argv[3]

//     fs.readdir(folder, function (err, files) {
//       if (err) return console.error(err)
//       files.forEach(function (file) {
//         if (path.extname(file) === ext) {
//           console.log(file)
//         }
//       })
//     })