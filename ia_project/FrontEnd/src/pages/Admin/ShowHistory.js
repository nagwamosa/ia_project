import { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import '../../css/ManageTraveller.css';
import '../../css/AcceptorDeline.css';
import {getAllhistory} from './api'
const ShowHistory = () => {
  const [historys, sethistorys] = useState([]);

  useEffect(() => {
    const fetchTravelers = async () => {
      const data = await getAllhistory();
      sethistorys(data);
    };
    fetchTravelers();
  }, []);

  

  return (
    <div className="container">
      <div className="table-wrap">
        <Table bordered responsive>
          <thead>
            <tr>
              <th></th>
              <th className="text-muted fw-600">Username</th>
              <th className="text-muted fw-600">Email</th>
              <th className="text-muted fw-600">FromLocation</th>
              <th className="text-muted fw-600">ToLocation</th>
              <th className="text-muted fw-600">Day</th>
            </tr>
          </thead>
          <tbody>
            {historys.map((history) => (
              <tr key={history.id} className="align-middle alert" role="alert">
                <td>
                  <input type="checkbox" id={`check-${history.id}`} />
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="ps-3">
                      <div className="fw-600 pb-1">{history.name}</div>
                     
                    </div>
                  </div>
                </td>
                <td>
                  <div className="fw-600">{history.email}</div>
                </td>
                <td>
                <div className="fw-600">{history.fromLocation}</div>
                </td>
                <td>
                <div className="fw-600">{history.toLocation}</div>                 
                </td>
                <td>
                <div className="fw-600">{history.day}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
export default ShowHistory