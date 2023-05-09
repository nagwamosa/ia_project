import React from "react";
import Card from "react-bootstrap/Card";
import "../css/MovieCard.css";
import { Link } from "react-router-dom";
import {CiLocationOn } from "react-icons/ci";
import {CiGps } from "react-icons/ci";
import {  getAuthUser } from "../helper/storage";
// import {  Button } from 'react-bootstrap';
// import images from '../css/2.avif';
import axios from 'axios';

const BusCard = (props) => {
  const auth = getAuthUser();
  const bookBus = (busno) => {
    const userid = auth.id;
    axios.post('http://localhost:4000/bookings', { busno, userid })
      .then(response => {
        console.log(response.data);
        alert(`Bus ${busno} has been booked successfully`);
      })
      .catch(error => console.error(error));
  };


  return (
    
    <div className="card">
      <div className="card-body">
      <Card.Title><p>
        <span className="fw-bold">
          <CiLocationOn />
          From:
        </span>{' '}
        {props.name}
      </p> </Card.Title>
      <Card.Text><p>
        <span className="fw-bold">
          <CiGps />
          To:
        </span>{' '}
        {props. description}
      </p></Card.Text>
      <Card.Text><p>
        <span className="fw-bold">
         
          Day:
        </span>{' '}
        {props. data}
      </p></Card.Text>
      <Card.Text><p>
        <span className="fw-bold">
         
            Time:
        </span>{' '}
        {props. time}
      </p></Card.Text>
      <Card.Text><p>
        <span className="fw-bold">
          
          Ticket price:
        </span>{' '}
        {props. price}
      </p></Card.Text>
      {auth ? (
          <button className="btn btn-primary" onClick={() => bookBus(props.id)}>Book Now</button>
        ) : (
          <Link to={"/Login"} className="nav-link">
                  Login
                </Link>
        )}
      </div>
    </div>
  );
};

export default BusCard;