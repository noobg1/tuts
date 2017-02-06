const express = require('express');
const app = express();
const fs = require('fs');
const file = 'sample.txt';
const bodyParser = require('body-parser');
//app.use(bodyParser);

app.get('/read', function (req, res) {
  fs.readFile(file, function (error, data) {
    if (error) console.log(error);
    else {
      console.log(data.toString());
      res.send(`${data.toString()}`);
    }
  });
});

app.post('/write/:text', function (req, res) {
  fs.appendFile(file, `\n${JSON.stringify(req.params['text'])}`, (err) => {
    if (err) throw err;
    console.log('It\'s saved!');
    res.end('done');
  });
});

app.listen(8001);
console.log('Listening on port 8001...');