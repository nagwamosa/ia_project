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
        ////////////////////login///////////////////
        router.post("/login", (req, res) => {
            const data = req.body;
            console.log(data);
            
            connection.query(`SELECT * FROM user WHERE email  = "${data.email}" AND password = "${data.password}"`, (err, result, fields) => {
              if (err) {
                console.error(err);
                return res.status(500).json({
                  errors: [{ msg: "Database error" }],
                });
              }
              
              // Check if the query returned any results
              if (result && result.length > 0) {
                const selectresult = result[0];
               store.storeBusno_UserId.userid =selectresult.id;
                
                console.log( store.storeBusno_UserId.userid );
                
                connection.query(`UPDATE user SET status  = 'active' WHERE id = ${selectresult.id}`, (error, result) => {
                  if (error) throw error;
                });
                
                res.json(result);
              } else {
                res.status(404).json({
                  errors: [{ msg: "email or password not found !" }],
                });
              }
              
              res.end();
            });
          });
          
          /////////////////////register///////////////////////////////
         
  
          router.post('/register', [
            body('name').notEmpty().withMessage("Please provide a value for 'name'"),
            body('email').isEmail().withMessage("Please provide a valid 'email' address"),
            body('password')
              .isLength({ min: 8 })
              .withMessage("Password must be at least 8 characters long"),
            body('phone').isMobilePhone().withMessage("Please provide a valid 'phone' number"),
          ], async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
            }
          
            const { name, email, password, phone } = req.body;
          
            // Check if user already exists
            connection.query('SELECT * FROM user WHERE email = ?', [email], (err, results) => {
              if (err) {
                throw err;
              }
          
              if (results.length > 0) {
                res.status(409).json({
                  errors: [
                    {
                      msg: 'Email already taken',
                    },
                  ],
                });
              } else {
                // Insert user into database
                connection.query(
                  'INSERT INTO user (name, email, password, phone ) VALUES (?, ?, ?, ?)',
                  [name, email, password, phone, ],
                  (err, results) => {
                    if (err) {
                      throw err;
                    }
                    connection.query(`SELECT * FROM user WHERE email = ?`, [email], (err, results) => {
                      if (err) throw err;
                    selectresult=results[0];
                    store.storeBusno_UserId.userid=selectresult.id;
                  
                    })
                    res.status(201).json({ message: 'User registered successfully' });
                  }
                );
              }
            });
          });
          ///////////////////////////////////////logout//////////////////////
 router.get('/logout', function(req, res, next){
  
            connection.query(`UPDATE user SET status = 'inactive' WHERE id = ${store.storeBusno_UserId.userid}`,
              (error, result) => {
                if (error) {
                  // If there was an error updating the user status in the database, send a custom error message as the response statusText
                  return res.status(500).send({ message: "Failed to update user status" });
                }
                console.log(store.storeBusno_UserId.userid);
                // If the session was destroyed and user status was updated successfully, redirect the user to the home page with a success status code
                store.storeBusno_UserId.userid=null;
              }
            );
          });
        ;
        
          module.exports = router;  