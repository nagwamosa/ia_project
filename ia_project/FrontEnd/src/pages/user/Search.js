import React, { useState, useEffect, useRef } from "react";
import BusCard from "../../components/BusCard";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import "../../css/search.css";
import backgroundImage from "../../css/5.jpeg";
import "../../css/home.css";
import { CiLocationOn } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CiGps } from "react-icons/ci";
import { Form, Button } from "react-bootstrap";
import { addsearch } from "../Admin/api";

const Search = () => {
  const [bus, setBus] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });
  const [search, setSearch] = useState("");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [countTraveler, setCountTraveler] = useState("");
  const resultsRef = useRef(null);
  const [searchHistory, setSearchHistory] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/search", {
        params: {
          fromLocation: fromLocation,
          toLocation: toLocation,
          countTraveler: countTraveler,
        },
      })
      .then((resp) => {
        setBus({
          ...bus,
          results: resp.data,
          loading: false,
          err: null,
        });
        setSearchHistory(resp.data.searchHistory);
      })
      .catch((err) => {
        setBus({
          ...bus,
          loading: false,
          err: "Something went wrong, please try again later!",
        });
      });
  }, [bus.reload, search]);

  const handleAddSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await addsearch({
        fromLocation,
        toLocation,
        countTraveler,
      });
      console.log("Search history added:", response);
      setSearch([...search, response]);
    } catch (error) {
      console.error("Failed to add search history:", error);
    }
  };

  useEffect(() => {
    handleAddSearch();
  }, [bus.results, bus.loading]);
  return (
    <div>
      {bus.loading === true && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {bus.loading === false && bus.err == null && (
        <>
          <div
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "90vh",
              width: "70vw",
              backgroundPosition: "0% 0%",
            }}
          >
            <Form>
              <Form className="search-form">
                <Form.Group controlId="fromLocation">
                  <CiGps style={{ fontSize: "36px" }} />
                  <Form.Label>From Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="fromLocation"
                    value={searchHistory?.fromLocation ?? fromLocation}
                    onChange={(event) => setFromLocation(event.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="toLocation">
                  <CiLocationOn style={{ fontSize: "36px" }} />
                  <Form.Label>To Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter to location"
                    value={searchHistory?.toLocation ?? toLocation}
                    onChange={(event) => setToLocation(event.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="max people">
                  <CiUser style={{ fontSize: "36px" }} />
                  <Form.Label>Max people</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter people"
                    value={countTraveler}
                    onChange={(event) =>
                      setCountTraveler(event.target.value)
                    }
                  />
                </Form.Group>
                <button
                  type="submit"
                  className="search-button"
                  onClick={handleAddSearch}> 
                Search
</button>
              </Form>
            </Form>
          </div>
          <div className="home-container p-5">
          <div className="row" ref={resultsRef}>
      {bus.results.map((buses) => (
        <div className="col-3 " key={buses.busno}>
          <BusCard
            name={buses.fromLocation}
            description={buses.toLocation}
            data={buses.day}
            price={buses.ticketprice}
            time={buses.time}
            id={buses.busno}
          />
        </div>
      ))}
    </div>
</div>
</>
      )}
      


    </div>
  );
};

export default Search;