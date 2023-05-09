const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { v4 } = require('uuid');
const connection = require('../db/dbConnection')

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/', (req, res) => {
  connection.query('SELECT * FROM appointment', (err, result) => {
    if (err) {
      console.log('Error fetching appointments: ', err);
      res.status(500).json({ message: 'An error occurred while fetching appointments' });
    } else {
      res.json(result);
    }
  });
});

router.post('/', (req, res) => {
  const data = req.body;

  connection.query(
    'INSERT INTO appointment SET ?',
    {
      fromLocation: data.fromLocation,
      toLocation: data.toLocation,
      ticketprice: data.ticketprice,
      day: data.day,
      time: data.time,
      maxnumberoftravelers: data.maxnumberoftravelers,
    },
    (err, result) => {
      if (err) {
        console.log('Error creating appointment:', err);
        res.status(500).json({ message: 'Error creating appointment' });
      } else {
        console.log('Appointment created successfully!');
        res.status(201).json({ message: 'Appointment created successfully' });
      }
    }
  );
});

router.get('/:busno', (req, res) => {
  const busno = req.params.busno;

  connection.query('SELECT * FROM appointment WHERE busno = ?', [busno], (err, result) => {
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ message: 'Appointment not found' });
    }
  });
});

router.put('/:busno', (req, res) => {
  const busno = req.params.busno;
  const data = req.body;

  connection.query(
    'UPDATE appointment SET ? WHERE busno = ?',
    [{ fromLocation: data.fromLocation, toLocation: data.toLocation, ticketprice: data.ticketprice, day: data.day, time: data.time, maxnumberoftravelers: data.maxnumberoftravelers }, busno],
    (err, result) => {
      if (err) {
        console.log('Error updating appointment: ', err);
        res.status(500).json({ message: 'An error occurred while updating the appointment' });
      } else if (result.changedRows === 0) {
        res.status(404).json({ message: 'Appointment not found' });
      } else {
        res.json({ message: 'Appointment updated successfully' });
      }
    }
  );
});

router.delete('/:busno', (req, res) => {
  const busno = req.params.busno;

  connection.query('DELETE FROM appointment WHERE busno = ?', [busno], (err, result) => {
    if (err) {
      console.log('Error deleting appointment: ', err);
      res.status(500).json({ message: 'An error occurred while deleting the appointment' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Appointment not found' });
    } else {
      res.json({ message: 'Appointment deleted successfully' });
    }
  });
});

module.exports = router;