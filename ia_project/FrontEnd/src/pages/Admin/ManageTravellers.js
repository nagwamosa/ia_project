import React, { useState, useEffect,userData } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { CiEdit } from "react-icons/ci";
import { CiEraser } from "react-icons/ci";
import '../../css/ManageTraveller.css';
import { getAllTravelers, addTraveler, updateTraveler, deleteTraveler } from './api';
import axios from 'axios';
const ManageTraveller = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [travelers, setTravelers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTravelers = async () => {
      const data = await getAllTravelers();
      setTravelers(data);
    };
    fetchTravelers();
  }, []);

  const handleAddTraveler = async () => {
    const traveler = { name, email, password, phone, type };
    try {
      const data = await addTraveler(traveler);
      setTravelers((prevState) => [...prevState, data]);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessage = error.response.data.errors.join('\n');
        alert(errorMessage);
      } else {
        alert('email already taken');
      }
    }
  };
  
  const handleUpdateTraveler = async () => {
    try {
      const traveler = { id: formData.id, name:name, email :email, password:password, phone:phone, type :type};
      const data = await updateTraveler(formData.id, traveler);
      //setTravelers(travelers.map((item) => (item.id === data.id ? data : item)));
      setTravelers((prevState) =>
      prevState.map((item) => {
        if (item.id=== traveler.id) {
          // return a new object with the updated value
          return traveler;
        }
        // for other items, return them as they are
        return item;
      }))
      handleCloseModal();
    } catch (error) {
      console.error('Error updating traveler:', error.message);
      // Optionally, display a message to the user indicating there was an error.
    }
  };

  const handleDeleteTraveler = async (id) => {
    await deleteTraveler(id);
    setTravelers(travelers.filter((traveler) => traveler.id !== id));
  };
 
  
  const handleShowModal = (data) => {
    setFormData(data);
    setName(data.name);
    setEmail(data.email);
    setPassword(data.password);
    setPhone(data.phone);
    setType(data.type);
    setShowModal(true);
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    if (formData.id) { 
      await handleUpdateTraveler();
    } else { 
      await handleAddTraveler();
    }
    setName('');
    setEmail('');
    setPassword('');
    setPhone('');
    setType('');
    setError('');
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setName('');
    setEmail('');
    setPassword('');
    setPhone('');
    setType('');
    setError('');
    setShowModal(false);
  };

  return (
    <div className="container">
      <div className="table-responsive">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-xs-6">
                <h2>Manage <b>Employees</b></h2>
              </div>
              <div className="add">
                <Button className='add' onClick={() => handleShowModal({})}>Add Travellers</Button>
              </div>
            </div>
          </div>

          <Table striped bordered>
            <thead>
              <tr>    
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Phone</th>
                <th>Type</th> 
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {travelers.map((traveler) => (
                <tr key={traveler.id}>
                  <td>{traveler.id}</td>
                  <td>{traveler.name}</td>
                  <td>{traveler.email}</td>
                  <td>{traveler.password}</td>
                  <td>{traveler.phone}</td>
                  <td>{traveler.type}</td>
                  <td>
                    <Button onClick={() => handleDeleteTraveler(traveler.id)}> <CiEraser/>Delete</Button>
                    <Button onClick={() => handleShowModal(traveler)}> <CiEdit/></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>{formData.id ? 'Edit' : 'Add'} Traveler</Modal.Title>
            </Modal.Header>
            <Modal.Body>
    <Form onSubmit={handleSubmitForm}>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formPhone">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formType">
        <Form.Label>Type</Form.Label>
        <Form.Select
          aria-label="Select Type"
          value={type}
          onChange={(event) => setType(event.target.value)}
          required
        >
          <option value="">Select Type</option>
          <option value="admin">Admin</option>
          <option value="traveler">Traveler</option>
        </Form.Select>
      </Form.Group>
      {error && <span style={{ color: 'red' }}>{error}</span>}
      <div className="d-flex justify-content-end">
        <Button className="me-3" onClick={() => setShowModal(false)}>Cancel</Button>
        <Button variant="primary" type="submit">{formData.id ? 'Update' : 'Add'}</Button>
      </div>
    </Form>
  </Modal.Body>
</Modal>
    </div>
    </div>
    </div>
   
  )
  
}

export default ManageTraveller