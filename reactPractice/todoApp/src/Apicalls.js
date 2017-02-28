import $ from 'jquery'

const read = function (callback = () => {}) {
  let dataObject;
  return $.get('http://localhost:8001/api/read/', (data) => {
    dataObject = data;
  })
  // .done(function () {
  //   console.log(dataObject)
  //   callback(null, dataObject, `Todo items loaded`)
  //   return dataObject;
  // }).fail(function () {
  //   callback('Failed to load todo items', null)
  // })
}

module.exports = {read}