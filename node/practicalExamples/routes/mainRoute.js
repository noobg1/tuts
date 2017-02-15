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

module.exports = router
