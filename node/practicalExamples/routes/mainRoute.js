var express = require('express')
var router = express.Router()
const fs = require('fs')
const file = 'sample.txt'

router.get('/read', function (req, res) {
  let result
  fs.readFile(file, function (error, data) {
    if (error) console.log(error)
    else {
      console.log(typeof data.toString())
      result = data.toString().split('\n')
      res.render('pages/index', {
        data: result
      })
    }
  })
})

router.post('/write', function (req, res) {

  fs.appendFile(file, req.body.name, (error) => {
    if (error) throw error
    console.log('It\'s saved!')
    res.end('done')
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
      res.send('done')
    })
  })
  console.log(req.body.index, req.body.newData)
})

router.post('/delete', function (req, res) {
  let result, finalResult
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
      return console.log(err)
    }
    result = data.split('\n')
    if (result.length > req.body.index) {
      console.log(result)
      result.splice(req.body.index, 1)
      console.log(result)
    } else {
      res.sendStatus(500)
    }
    finalResult = result.join('\n')
    fs.writeFile(file, finalResult, 'utf8', function (err) {
      if (err) return console.log(err)
      res.send('done')
    })
  })
})

module.exports = router;
