const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const util = require('util');
const fs = require('fs');

let app = express();
app.use(express.static('www'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({
  extended: true
}));

let db = new sqlite3.Database(path.join(__dirname, 'database.db'));

app.post('/new-user', function(req, res) {
  //TODO: Sanitize
  //TODO: Send response
  //TODO: Handle errors
  fs.readFile('sql/NewUser.sql', 'utf-8', function(err, data) {
    if(!err) {
      db.run(data, {
        "@name": req.body.name,
        "@lastname": req.body.lastname,
        "@tag": req.body.tag
      });
    } else {

    }
  });
});

app.post('/new-check', function(req, res) {
  //TODO: Change to Arduino
  //TODO: Handle errors
  fs.readFile('sql/NewCheck.sql', 'utf-8', function(err, data) {
    if(!err) {
      db.run(data, {
        "@tag": req.body.tag
      });
    } else {

    }
  });
});

app.post('/get-report', function(req, res) {
});

process.on('SIGINT', function() {
  console.log('SIGINT');
  process.exit();
});

app.listen(3000);
