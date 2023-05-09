var express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const store = require('./store');
// parse application/x-www-form-urlencoded
const connection = require('../db/dbConnection')
  router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


router.get("/viewuser", (req, res) => {
  connection.query(`select * from appointment  JOIN manytomany mtm ON appointment.busno=mtm.busno JOIN user ON user.id=mtm.userid WHERE id =${users.userid} `, (err, result, fields) => {
      res.send(result);
  });
 
});


//////////////////////////////view admin
router.get("/viewhistory", (req, res) => {
  connection.query("select * from appointment  JOIN manytomany mtm ON appointment.busno=mtm.busno JOIN user ON user.id=mtm.userid ", (err, result, fields) => {
      res.send(result);
  });
});


module.exports = router;