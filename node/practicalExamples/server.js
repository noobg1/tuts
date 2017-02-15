const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const appRoutes = require(path.join(__dirname, '/routes/mainRoute'))
const apiRoutes = require('./routes/api')

// set the view engine to ejs
app.set('view engine', 'ejs')


app.use(bodyParser.urlencoded({ extended: false }))
//app.use(bodyParser.json())
app.use(express.static('public'))
//app.use(express.static('test'))
app.use('/api', apiRoutes)
app.use(appRoutes)


app.listen(8001)
console.log('Listening on port 8001...')

module.exports = app
