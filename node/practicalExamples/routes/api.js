const express = require('express')
const router = express.Router()
const path = require('path')
const dbOperations = require(path.join(__dirname, '../todoAppDbOperations'))

router.get('/read', function (req, res) {
  dbOperations.read()
  .then(function (results) {
    res.status(200).send(results[0])
  })
  .catch(function (error) {
    console.log(error)
    res.status(500).send(error)
  })
})


router.post('/write/:task', function (req, res) {
  let description = req.params['task']
  dbOperations.insert(description)
  .then(function (results) {
    console.log(results[0].id)
    res.status(200).send({ id: results[0].id, message: 'Task added' })
  })
  .catch(function (error) {
    res.status(404).send(error)
  })
})

router.put('/update/:id', function (req, res) {
  const id = req.params.id
  const description = req.body['task']
  const status = req.body['status']
  dbOperations.update(description, id, status)
  .then(function (results) {
    if (results[1].rowCount < 1) {
      throw { errCode: 501,
        message: `id ${id} is invalid`
      }
    }
    res.status(200).send(`{ Updated task for given id = ${id} }`)
  })
  .catch(function (error) {
    if (error.errCode) {
      res.status(error.errCode).send({ message: error.message })
      return
    }
    res.sendStatus(500)
  })
})

router.delete('/delete/:id', function (req, res) {
  const id = req.params.id
  dbOperations.destroy(id)
  .then(function (results) {
    if (results[1].rowCount < 1) {
      throw { errCode: 501,
        message: `id ${id} is invalid`
      }
    }
    res.status(200).send(`{ Deleted task id = ${id}}`)
  })
  .catch(function (error) {
    if (error.errCode) {
      res.status(error.errCode).send({ message: error.message })
      return
    }
    res.sendStatus(500)
  })
})

module.exports = router
