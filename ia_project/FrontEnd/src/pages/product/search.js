import React, { useState, useEffect } from 'react';

const TravelerHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [travelerRequests, setTravelerRequests] = useState([]);

  // fetch traveler requests from API
  useEffect(() => {
    fetch('/api/traveler-requests')
      .then(res => res.json())
      .then(data => setTravelerRequests(data))
      .catch(err => console.error(err));
  }, []);

  // filter traveler requests based on search term
  const filteredRequests = travelerRequests.filter(request => {
    return request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.destination.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <h2>Traveler Request History</h2>
      <input
        type="text"
        placeholder="Search by name or destination"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Destination</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map(request => (
            <tr key={request.id}>
              <td>{request.name}</td>
              <td>{request.destination}</td>
              <td>{request.date}</td>
              <td>{request.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TravelerHistory;
