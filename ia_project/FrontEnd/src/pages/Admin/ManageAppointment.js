
import React from 'react';
import BusCard from '../../components/BusCard';
 import axios from "axios";
 import Spinner from "react-bootstrap/Spinner";

import { useState ,useEffect} from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { CiEdit } from "react-icons/ci";
import { CiEraser } from "react-icons/ci";
 import '../../css/ManageTraveller.css'
 import { getAllappointment, getappointmentById, addappointment, updateappointment, deleteappointment } from './api';
const Manageappointment = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [appointments, setappointments] = useState([]);
  const [fromLocation, setfromLocation] = useState('');
  const [toLocation, settoLocation] = useState('');
  const [day, setday] = useState('');
  const [time, settime] = useState('');
  const [ticketprice, setticketprice] = useState('');
  const [maxnumberoftravelers, setmaxnumberoftravelers] = useState('');
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchappointment = async () => {
      const data = await getAllappointment();
      setappointments(data);
    };
    fetchappointment();
  }, []);

  const handleAddappointment = async () => {
    const appointment = { fromLocation, toLocation, day,time, ticketprice, maxnumberoftravelers };
    const data = await addappointment(appointment);
    setappointments([...appointments, data]);
  };
  const handleUpdateappointment = async () => {
    const appointment = { busno: formData.busno, fromLocation, toLocation, day,time, ticketprice, maxnumberoftravelers };
    const data = await updateappointment(formData.busno, appointment);
    // setappointments(appointments.map(item => item.busno === data.busno ? data : item));
    setappointments((prevState) =>
      prevState.map((item) => {
        if (item.busno=== appointment.busno) {
          // return a new object with the updated value
          return appointment;
        }
        // for other items, return them as they are
        return item;
      }))
    handleCloseModal();
  
  };


  const handleDeleteappointment = async (busno) => {
    await deleteappointment(busno);
    setappointments(appointments.filter((appointment) => appointment.busno !== busno));
  };

  // Function to handle opening the modal for adding/editing appointments
  // const handleShowModal = (data) => {
  //   setFormData(data);
  //   setShowModal(true);
  // };
  const handleShowModal = (data) => {
    setFormData(data);
    setfromLocation(data.fromLocation);
    settoLocation(data.toLocation);
    setday(data.day);
    settime(data.time);
    setticketprice(data.ticketprice);
    setmaxnumberoftravelers(data.maxnumberoftravelers);
    setShowModal(true);
  };
  // Function to handle submitting the appointment form
  // const handleSubmitForm = (event) => {
  //   event.preventDefault();
  //   console.log(formData); // Replace with actual form submission logic
  //   setShowModal(false);
  // };
  const handleSubmitForm = async (event) => {
    event.preventDefault();
    if (formData.busno) { // If formData has an busno, it means we are updating an existing appointment
      await handleUpdateappointment();
    } else { // Otherwise, we are adding a new appointment
      await handleAddappointment();
    }
    setfromLocation('');
    settoLocation('');
    setday('');
    settime('');
    setticketprice('');
    setmaxnumberoftravelers('');
    setError('');
    setShowModal(false);
  };
  const handleCloseModal = () => {
    setfromLocation('');
    settoLocation('');
    setday('');
    settime('');
    setticketprice('');
    setmaxnumberoftravelers('');
    setError('');
    setShowModal(false);
  };
  return (
    <div>
      <div class="container">
		<div class="table-responsive">
			<div class="table-wrapper">``
				<div class="table-title">
					<div class="row">
						<div class="col-xs-6">
							<h2>Manage <b>Appointments</b></h2>
						</div>
						<div class="add">
							<Button className='add' onClick={() => handleShowModal({})}>Add Appointments</Button>
											
						</div>
					</div>
      {/* Button to open modal for adding new appointment */}
      {/*  */}

      {/* Table of existing appointments */}
      <Table striped bordered>
      
       
       <thead>
          <tr>
          
							
            <th>busno</th>
            <th>fromLocation</th>
            <th>toLocation</th>
            <th>day</th>
            <th>time</th>
            <th>ticketprice</th>
           <th>maxnumberoftravelers</th> 
            <th>Action</th>

          </tr>
        </thead>
        <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.busno}>
                  <td>{appointment.busno}</td>
                  <td>{appointment.fromLocation}</td>
                  <td>{appointment.toLocation}</td>
                  <td>{appointment.day}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.ticketprice}</td>
                  <td>{appointment.maxnumberoftravelers}</td>
                  <td>
                    
                 
          {/* Button to open modal for editing appointment */}
          <Button onClick={() =>handleDeleteappointment(appointment.busno)} > <CiEraser/>Delete</Button>
                <Button onClick={() => handleShowModal(appointment)}> <CiEdit/></Button>
                {/* Delete button (replace with actual delete logic) */}
               
                </td>
      </tr>
    ))}
  </tbody>
</Table>
      {/* Modal for adding appointment */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>{formData.busno ? 'Edit' : 'Add'} appointment</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form onSubmit={handleSubmitForm}>
      <Form.Group controlId="formName">
        <Form.Label>fromLocation</Form.Label>
        <Form.Control
          type="text"
          placeholder="fromLocation"
          value={fromLocation}
          onChange={(event) => setfromLocation(event.target.value)}
          required
        />
        
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>toLocation</Form.Label>
        <Form.Control
          type="toLocation"
          placeholder="toLocation"
          value={toLocation}
          onChange={(event) => settoLocation(event.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>day</Form.Label>
        <Form.Control
          type="day"
          placeholder="day"
          value={day}
          onChange={(event) => setday(event.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>time</Form.Label>
        <Form.Control
          type="time"
          placeholder="time"
          value={time}
          onChange={(event) => settime(event.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formPhone">
        <Form.Label>ticketprice</Form.Label>
        <Form.Control
          type="text"
          placeholder="ticketprice Number"
          value={ticketprice}
          onChange={(event) => setticketprice(event.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formPhone">
        <Form.Label>maxnumberoftravelers</Form.Label>
        <Form.Control
          type="text"
          placeholder="maxnumberoftravelers"
          value={maxnumberoftravelers}
          onChange={(event) => setmaxnumberoftravelers(event.target.value)}
          required
        />
      </Form.Group>
      {error && <span style={{ color: 'red' }}>{error}</span>}
      <div className="d-flex justify-content-end">
        <Button className="me-3" onClick={() => setShowModal(false)}>Cancel</Button>
        <Button variant="primary" type="submit">{formData.busno ? 'Update' : 'Add'}</Button>
      </div>
    </Form>
  </Modal.Body>
</Modal>
    </div>
    </div>
    </div>
    </div>
    </div>
  )
  
}

export default Manageappointment

