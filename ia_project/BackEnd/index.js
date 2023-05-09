const express = require('express');
const bodyParser = require('body-parser');
const app = express();


// to solve  Server is not configured to allow requests from your origin. error
const cors = require('cors');

const BookingProcessor = require('./routers/BookingProcessor');
const manageappointment = require('./routers/manageappointment');
const manageuser = require('./routers/manageuser');
const auth = require('./routers/auth')
const history = require('./routers/history')
const request = require('./routers/request')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
// Set up session middleware


   app.use(cors());


// here the string is refers to the parent route
// it's the route that repeats in all request
app.use("/", BookingProcessor);
app.use("/appointment", manageappointment);
app.use("/traveler", manageuser);
app.use("/", auth);
app.use("/", history);
app.use("/", request);
app.listen(4000, 'localhost', () => {
    console.log("SERVER IS RUNNING");
});