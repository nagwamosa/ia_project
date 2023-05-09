import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import { useState, useEffect } from 'react';
import {
    MDBIcon,
    MDBBadge,
    MDBNavbarLink
  } from 'mdb-react-ui-kit'
import { getacceptuser,getdeclineuser } from '../Admin/api';
const Accept = () => {
    const [requests, setrequests] = useState([]);
    const [request, setrequest] = useState([]);
    useEffect(() => {
        const fetchTravelers = async () => {
          const data = await getacceptuser();
          
          setrequests(data);
        };
        fetchTravelers();
      }, []);
      useEffect(() => {
        const fetchTravelers = async () => {
          const data = await getdeclineuser();
          
          setrequest(data);
        };
        fetchTravelers();
      }, []);
    return (
    <Dropdown>
    
    <Dropdown.Toggle variant="dark" id="dropdown-basic">
      request
    </Dropdown.Toggle>

    <Dropdown.Menu>

     {requests.map((request) => (
    <Dropdown.Item href="#/action-1">
      <MDBNavbarLink href='#'>
        <MDBBadge pill color='danger'>{request.request_status}</MDBBadge>
        <span>
          <MDBIcon fas icon='shopping-cart'></MDBIcon>
        </span>
      </MDBNavbarLink>
    </Dropdown.Item>
  ))}
  {request.map((decline) => (
    <Dropdown.Item href="#/action-1">
      <MDBNavbarLink href='#'>
        <MDBBadge pill color='danger'>{decline.request_status}</MDBBadge>
        <span>
          <MDBIcon fas icon='shopping-cart'></MDBIcon>
        </span>
      </MDBNavbarLink>
    </Dropdown.Item>
  ))}
     
    </Dropdown.Menu>
  </Dropdown>
  )
}

export default Accept