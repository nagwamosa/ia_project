const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { v4 } = require('uuid');
const connection = require('../db/dbConnection')
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


// GET request => get all travelers
router.get("/", (req, res) => {
  connection.query("SELECT * FROM user", (err, result, fields) => {
      res.send(result);
  });
});
//insert
router.post("/", (req, res) => {
  const data = req.body;
  console.log(data);
  connection.query(`SELECT * FROM user WHERE email = ?`, [data.email], (err, results) => {
      if (err) throw err;
  
      if (results.length > 0) {
        res.status(409).json({ message: 'email already taken' });
      }
      else{
  connection.query("insert into user set ?",
  { name: data.name, email: data.email , password:data.password,phone:data.phone ,type:data.type},
  (err, result, fields) => {
      if (err) {
          // result.statusCode = 500;
         
              console.log('Error inserting user: ', err);
          

      } else {
          res.json({
              message: "traveller created !"
          })
      }
  });
}
});
});

// search by id about traveler
router.get("/:id", (req, res) => {
  const { id } = req.params;
  connection.query("select * from user where ?", { id: id }, (err, result, fields) => {
      // if there is no result this will return undefined which means false
      if (result[0]) {
          res.json(result[0]);
      } else {
          res.statusCode = 404;
          res.json({
              message: "traveler not found",
          });
      }
  });
});
;

// Put request => modify a specific traveler
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body;
  
  connection.query("update user set ? where id = ?",
      [{ name: data.name, email: data.email , password:data.password,phone:data.phone}, id], (err, result) => {
          if (err) {
              res.statusCode = 505;
              res.json({
                  message: "Failed to update the traveler"
              });
          } else {
              res.json({
                  message: "traveler updated successfully"
              });
          }
      });
});

// Delete request => delete a traveler
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  connection.query("DELETE FROM user WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.log('Error deleting traveler: ', err);
      res.status(500).json({ message: "An error occurred while deleting the traveler" });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: "Traveler not found" });
    } else {
      res.json({ message: "Traveler deleted successfully" });
    }
  });
});
module.exports = router;