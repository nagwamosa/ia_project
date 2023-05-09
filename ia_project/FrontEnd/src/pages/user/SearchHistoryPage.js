import { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import '../../css/ManageTraveller.css';
import '../../css/AcceptorDeline.css';
import { getAllsearchhistory } from '../Admin/api'; 
const ShowHistoryPage = () => {
  const [searchhistorys, setsearchhistorys] = useState([]);

  useEffect(() => {
    const fetchTravelers = async () => {
      const data = await getAllsearchhistory();
      setsearchhistorys(data);
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
              
              <th className="text-muted fw-600">id</th>
              <th className="text-muted fw-600">FromLocation</th>
              <th className="text-muted fw-600">ToLocation</th>
              <th className="text-muted fw-600">Day</th>
            </tr>
          </thead>
          <tbody>
            {searchhistorys.map((searchhistory) => (
              <tr key={searchhistory.userid} className="align-middle alert" role="alert">
                <td>
                  <input type="checkbox" id={`check-${searchhistory.userid}`} />
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="ps-3">
                      <div className="fw-600 pb-1">{searchhistory.userid}</div>
                     
                    </div>
                  </div>
                </td>
                
                <td>
                <div className="fw-600">{searchhistory.fromLocation}</div>
                </td>
                <td>
                <div className="fw-600">{searchhistory.toLocation}</div>                 
                </td>
                
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
export default ShowHistoryPage