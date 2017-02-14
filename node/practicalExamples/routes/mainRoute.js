var express = require('express')
var router = express.Router()
const fs = require('fs')
const file = 'sample.txt'

router.get('/', function (req, res) {
  res.render('pages/index')
})

router.get('/test', function (req, res) {
  res.sendFile('indexTest.html')
})

router.get('/read', function (req, res) {
  let result
  fs.readFile(file, function (error, data) {
    if (error) console.log(error)
    else {
      result = data.toString().split('\n')
      res.render('pages/index', {
        data: result
      })
    }
  })
})

router.post('/write', function (req, res) {

  fs.appendFile(file, req.body.data + '<br>\n', (error) => {
    if (error) throw error
    res.redirect('/')
  })
})

router.post('/update', function (req, res) {
  let result, finalResult
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
      return console.log(err)
    }
    result = data.split('\n')
    if (result.length > req.body.index) {
      result[req.body.index] = req.body.newData + '<br>'
    } else {
      res.sendStatus(500)
      return
    }
    finalResult = result.join('\n')
    fs.writeFile(file, finalResult, 'utf8', function (err) {
      if (err) return console.log(err)
      res.redirect('/')
    })
  })
})

router.post('/delete', function (req, res) {
  let result, finalResult
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
      return console.log(err)
    }
    result = data.split('\n')
    if (result.length > req.body.index) {
      result.splice(req.body.index, 1)
    } else {
      res.sendStatus(500)
    }
    finalResult = result.join('\n')
    fs.writeFile(file, finalResult, 'utf8', function (err) {
      if (err) return console.log(err)
      res.redirect('/')
    })
  })
})

module.exports = router
