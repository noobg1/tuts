var express = require('express')
var router = express.Router()
const fs = require('fs')
const file = 'sample.txt'

router.get('/read', function (req, res) {
  fs.readFile(file, function (error, data) {
    if (error) console.log(error)
    else {
      console.log(data.toString())
      res.send(`${data.toString()}`)
    }
  })
})

router.post('/write/:text', function (req, res) {
  fs.appendFile(file, `${JSON.stringify(req.params['text'])}<br>\n`, (error) => {
    if (error) throw error
    console.log('It\'s saved!')
    res.end('done')
  })
})

router.put('/update/:lineNumber', function (req, res) {
  let result, finalResult
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
      return console.log(err)
    }
    result = data.split('\n')
    if (result.length > req.params.lineNumber) {
      result[req.params.lineNumber] = req.body['data'] + '<br>'
    } else {
      res.sendStatus(500)
    }
    finalResult = result.join('\n')
    fs.writeFile(file, finalResult, 'utf8', function (err) {
      if (err) return console.log(err)
      res.send('done')
    })
  })
  console.log(req.params.lineNumber, req.body['data'])
})

router.delete('/delete/:lineNumber', function (req, res) {
  let result, finalResult
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
      return console.log(err)
    }
    result = data.split('\n')
    if (result.length > req.params.lineNumber) {
      console.log(result)
      result.splice(req.params.lineNumber, 1)
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
