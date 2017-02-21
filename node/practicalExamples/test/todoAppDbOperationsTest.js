const dbOperations = require('../todoAppDbOperations')
const chai = require('chai')


dbOperations.read()
  .then(function (results) {
    console.log(results[0].map((item) => { return item.description }))
  })
  .catch(function (error) {
    console.log(error)
  })

dbOperations.insert('task 1')
  .then(function (results) {
    console.log('Added task')
  })
  .catch(function (error) {
    console.log(error)
  })

dbOperations.update('new task 2', 1)
  .then(function (results) {
    if (results[1].rowCount < 1) {
      throw new Error('No such id present')
    }
    console.log('Updated task for given id')
  })
  .catch(function (error) {
    console.log(error)
  })

dbOperations.destroy(20)
  .then(function (results) {
    if (results[1].rowCount < 1) {
      throw new Error('No such id present')
    }
    console.log('Deleted task')
  })
  .catch(function (error) {
    console.log(error.toString())
  })
