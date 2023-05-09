


import { useState, useEffect } from 'react';
   import { Table, Button } from 'react-bootstrap';
   import '../../css/ManageTraveller.css';
   import '../../css/AcceptorDeline.css';
   import { getrequsetwaiting, accept,Decline } from './api';
   const Request = () => {
      
      const [formData, setFormData] = useState({});
      const [request_status, setrequest_status] = useState({});
      const [userid, setuserid] = useState({});
     const [requests, setrequests] = useState([]);
      useEffect(() => {
       const fetchTravelers = async () => {
         const data = await getrequsetwaiting();
         setrequests(data);
       };
       fetchTravelers();
     }, []);
    
     const handleClick = (event) => {
      event.preventDefault();
     handleAccept()

    };
  
    const handleAccept = async (userid) => {
      const requests = { userid: formData.userid, request_status: 'accept' };
      const data = await accept(userid, requests);
    
      // Assuming that the state variable is named `appointments`, change the following line:
      // setrequests(requests.map(item => item.busno === data.busno ? data : item));
    
      // To filter out the accepted request from the list of requests
      setrequests(requests.filter(item => item.busno === data.busno ? data : item));
    
      handleCloseModal(); // Assuming that this function is defined somewhere in your code
    };
    
    
     const handleDecline  = async (userid) => {
       const requests = {  userid: formData.userid, request_status: 'decline' };
       const data = await Decline(userid, requests);
       
       // Assuming that the state variable is named `appointments`, change the following line:
       // setrequests(requests.map(item => item.busno === data.busno ? data : item));
       // to:
       setrequests(requests.map(item => item.busno === data.busno ? data : item));
       
       handleCloseModal(); // Assuming that this function is defined somewhere in your code
     };
     const handleCloseModal = () => {
       // Your code to close the modal window goes here
       console.log('Modal closed');
     }
     return (
       <div className="container">
         <div className="table-wrap">
           <Table bordered responsive>
             <thead>
               <tr>
                 <th></th>
                 <th className="text-muted fw-600">Username</th>
                 <th className="text-muted fw-600">Email</th>
                 <th className="text-muted fw-600">fromLocation</th>
                 <th className="text-muted fw-600">toLocation</th>
                 <th className="text-muted fw-600">Status</th>
                 <th></th>
               </tr>
             </thead>
             <tbody>
               {requests.map((request) => (
                 <tr key={request.id} className="align-middle alert" role="alert">
                   <td>
                     <input type="checkbox" id={`check-${request.id}`} />
                   </td>
                   <td>
                     <div className="d-flex align-items-center">
                       <div className="ps-3">
                         <div className="fw-600 pb-1">{request.name}</div>
                        
                       </div>
                     </div>
                   </td>
                   <td>
                     <div className="fw-600">{request.email}</div>
                   </td>
                   <td>
                     <div className="fw-600">{request.fromLocation}</div>
                   </td>
                   <td>
                     <div className="fw-600">{request.toLocation}</div>
                   </td>
                   <td>
                   <div className="fw-600">{request.request_status}</div>
                   </td>
                   <td>
                   <Button variant="success" onClick={(event) => {
  console.log('Button clicked!');
  event.preventDefault();
  console.log('Prevented default behavior.');
  console.log('User ID:', request.userid);
  handleAccept(request.userid);
}}>Accept</Button>


                     <Button variant="danger" onClick={() => handleDecline(request.userid)}>Decline</Button>
                     
                   </td>
                 </tr>
               ))}
             </tbody>
           </Table>
         </div>
       </div>
     );
   };
   
   export default Request;
 