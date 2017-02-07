var fs = require('fs')
var directory = process.argv[2]

function readFilePromise (file) {
  return new Promise(function (resolve, reject) {
    fs.readFile(directory, function (error, data) {
      if (error) {
        reject(error)
      }
      var numberOflines = data.toString().split('\n').length - 1
      console.log(numberOflines)
      resolve(data)
    })
  })
}

module.exports = readFilePromise
