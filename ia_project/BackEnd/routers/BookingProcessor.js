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


router.post('/bookings', async (req, res) => {
  console.log(store.storeBusno_UserId.busNo)
  console.log(store.storeBusno_UserId.userid)
  try {
    console.log(store.storeBusno_UserId.userid);
    connection.query('INSERT INTO manytomany ( userid, busno, request_status) VALUES ( ?, ?, ?)', [store.storeBusno_UserId.userid,store.storeBusno_UserId.busNo,"waiting"], (error, results) => {
      if (error) throw error;
    })

    res.status(200).json({
      message: `Bus ${store.storeBusno_UserId.busNo} has been booked successfully`
       });
       
      
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to book the bus');
  }
});

/////////////search//////////////
router.get('/search', (req, res) => {
  const { fromLocation, toLocation, countTraveler } = req.query;

  let query = 'SELECT * FROM appointment';

  if (fromLocation && toLocation && countTraveler) {
    console.log(countTraveler)
    query += ` WHERE fromLocation='${fromLocation}' AND toLocation='${toLocation}' AND maxnumberoftravelers - ${countTraveler} >= 0`;
  } else if (fromLocation && toLocation) {
    query += ` WHERE fromLocation='${fromLocation}' AND toLocation='${toLocation}'`;
  } else if (fromLocation && countTraveler) {
    query += ` WHERE fromLocation='${fromLocation}' AND maxnumberoftravelers-${countTraveler}>=0`;
  } else if (toLocation && countTraveler) {
    query += ` WHERE toLocation='${toLocation}' AND maxnumberoftravelers-${countTraveler}>=0`;
  } else if (fromLocation) {
    query += ` WHERE fromLocation='${fromLocation}'`;
  } else if (toLocation) {
    query += ` WHERE toLocation='${toLocation}'`;
  } else if (countTraveler) {
    query += ` WHERE maxnumberoftravelers-${countTraveler}>=0`;
  }
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
    console.log(results);
    var selectresult =results[0];
       
                if (results.length>0){
                  store.storeBusno_UserId.busNo = selectresult.busno;
                   console.log(store.storeBusno_UserId.busNo); 
                 store.claculateAvailableSeat.maxNumberOfTravelers =selectresult.maxnumberoftravelers;
                store.claculateAvailableSeat.countTraveler=countTraveler; 
                if(countTraveler)     {       
                connection.query("update user set ? where id = ?",
                [{ counttraveler:store.claculateAvailableSeat.countTraveler}, store.storeBusno_UserId.userid], (err, result) => {
                    if (err) {
                      console.log(err);
                    } else {
                      
                    }
                });
                }} 
               ;})})
     
router.post("/addsearchhistory", (req, res) => {
  // const data = req.body;
  connection.query("insert into userhistory set ?",
      {
          userid: store.storeBusno_UserId.userid,
          fromLocation:req.body. fromLocation,
          toLocation: req.body.toLocation,
      }, 
      (err, result) => {
          if (err) {
              console.log(err); 
              result.statusCode = 500;
              res.send({
                  message: "Server error, Failed to add search term" 
              })

          } else {
              res.json({
                  message: "added successfully"
              })
          }
      }); 

});

router.get("/searchhistory", (req, res) => {
   
    connection.query(`SELECT * FROM userhistory where userid = ${store.storeBusno_UserId.userid}`, (err, result, fields) => {
        if (err) {
            console.log(err);
            result.statusCode = 500;
            res.send({
                message: "Server error, Failed to add search term"
            })

        } else {
            res.send(result);
        }

    });
});           
    
   
//////////////////////


         module.exports = router;