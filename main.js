const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const util = require('util');

let app = express();
app.use(express.static('www'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({
  extended: true
}));

let db = new sqlite3.Database(path.join(__dirname, 'database.db'));

app.post('/new-user', function(req, res) {
  //TODO: Sanitize
  db.run(util.format(
        "INSERT INTO Users(id, name, lastname, tag) "
        + "VALUES(abs(random()), '%s', '%s', '%s')",
        req.body.name,
        req.body.lastname,
        req.body.tag
        ));
  //res.sendFile();
});

app.post('/new-check', function(req, res) {
  //TODO: Change to Arduino
  let userFromTag = "SELECT id FROM Users WHERE tag = '%s' LIMIT 1";
  let countChecks = "SELECT (COUNT(*) + 1) % 2 FROM Checks "
    + "WHERE userId = (" + userFromTag + ") AND time >= DATE('now') "
    + "AND time < DATE('now', '+1 day')";
  db.run(util.format(
        "INSERT INTO Checks(id, userId, time, inout)"
        + "VALUES(ABS(RANDOM()), (" + userFromTag + "), DATETIME('now'), ("
        + countChecks + "))",
        req.body.tag, req.body.tag));
});

process.on('SIGINT', function() {
  console.log('SIGINT');
  process.exit();
});

app.listen(3000);
