import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { removeAuthUser, getAuthUser } from "../helper/storage";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Accept from "../pages/user/Accept";
const Header = () => {
  const navigate = useNavigate();
  const auth = getAuthUser();

  const logout = () => {
    removeAuthUser();
    navigate("/");
    axios.get("http://localhost:4000/logout")
      .then(response => {
        if (response.status === 200) {
          console.log("Logged out successfully");
        } else {
          console.error(response.statusText);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/Home">Bus Booking</Navbar.Brand>
  
          {auth && (
            <Nav className="me-auto">
              {Object.values(auth).map((admin) => {
                const { type } = admin;
                return type === "traveler" ? (
                  <>
                    <Link to={"/Search"} className="nav-link">
                      Search
                    </Link> 
                    <Link to={"/ShowHistoryPage"} className="nav-link">
                      SearchHistory
                    </Link>
                    <Accept/>
                  </>
                ) : type === "admin" ? (
                  <>
                    <Link to={"/ManageAppointment"} className="nav-link">
                      Manage Appointments
                    </Link>
                    <Link to={"/ManageTravellers"} className="nav-link">
                      Manage Travellers
                    </Link>
                    <Link to={"/ShowHistory"} className="nav-link">
                      Show History
                    </Link>
                    <Link to={"/Request"} className="nav-link">
                      Accept or Decline
                    </Link>
                  </>
                ) : null;
              })}
            </Nav>
          )}
     <Nav className="ms-auto">
            {!auth ? (
              <>
                <Link to={"/Login"} className="nav-link">
                  Login
                </Link>
                <Link to={"/Register"} className="nav-link">
                  Register
                </Link>
              </>
            ) : (
              <Nav.Link onClick={logout}>Logout</Nav.Link>
            )}
          </Nav>   </Container>
      </Navbar>
      
    </>
  );
};

export default Header;
