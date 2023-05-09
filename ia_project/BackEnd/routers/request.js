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
  
  
  
  ///////////////////requst User////////////////////
//    router.post('/requests', (req, res) => {
//     //const {  userid,  busno } = req.body;
//     const status = 'waiting';

//     connection.query('INSERT INTO manytomany ( userid, busno, request_status) VALUES ( ?, ?, ?)', [users.userid,users. busno, status], (error, results) => {
//         if (error) throw error;
//         res.send('Request sent to admin');
//     });
// });
//////////////////requst admin/////////////////  
router.get("/request", (req, res) => {
  // connection.query("insert into user (counttraveler)VALUS(?)",[store.claculateAvailableSeat.countTraveler], (error, results) => {})
  connection.query("select * from appointment JOIN manytomany mtm ON appointment.busno=mtm.busno JOIN user ON user.id=mtm.userid WHERE request_status= 'waiting'; ", (err, result, fields) => {
      res.send(result);
  });
});    
 ////////////// // Accept a request   
 router.put('/accept/:userid', (req, res) => {
  const { userid } = req.params;
  const status = 'accept';
   connection.query(`select * from appointment  JOIN manytomany mtm ON appointment.busno=mtm.busno JOIN user ON user.id=mtm.userid WHERE id =${userid} `, (err, result, fields) => {
  selectResult=result[0];
  // console.log(counters)
    remaining=selectResult.maxnumberoftravelers-selectResult.counttraveler;
              console.log(remaining);
              console.log(selectResult);
              console.log(selectResult.counttraveler);
              if(remaining >= 0){ 
                connection.query(`UPDATE appointment SET maxnumberoftravelers=${remaining} where busno = ${selectResult.busno}`, (err, results) => {
                if (err) throw err;
                                   })
             
                   connection.query('UPDATE manytomany SET request_status = ? WHERE userid = ?', [status,userid] , (error, results) => {
                         if (error) throw error;
                    res.json(`Request with id ${userid} has been accepted`);
                  });
  }
              
  });
  })
            

// Decline a request
router.put('/decline/:userid', (req, res) => {
const userid = req.params.userid;
const status = 'decline';

connection.query('UPDATE manytomany SET request_status = ? WHERE userid = ?', [status, userid], (error, results) => {
  if (error) throw error;
  res.send(`Request with userid ${userid} has been declined`);
});
});
//////////////////////////view/////////////
router.get("/acceptuser", (req, res) => {

connection.query(`select * from appointment JOIN manytomany mtm ON appointment.busno=mtm.busno JOIN user ON user.id=mtm.userid WHERE request_status= 'accept' AND id = ${store.storeBusno_UserId.userid}; `, (err, result, fields) => {
  res.send(result);
});
});    
////////////////////////////////////
router.get("/declineuser", (req, res) => {

connection.query(`select * from appointment JOIN manytomany mtm ON appointment.busno=mtm.busno JOIN user ON user.id=mtm.userid WHERE request_status= 'decline' AND id = ${store.storeBusno_UserId.userid}; `, (err, result, fields) => {
  res.send(result);
});
});    


module.exports = router;