import axios from 'axios';

const API_URL = 'http://localhost:4000';

export const getAllTravelers = async () => {
  const response = await axios.get(`${API_URL}/traveler`);
  return response.data;
};

export const getTravelerById = async (id) => {
  const response = await axios.get(`${API_URL}/traveler/${id}`);
  return response.data;
};

export const addTraveler = async (traveler) => {
  const response = await axios.post(`${API_URL}/traveler`, traveler);
  return response.data;
};

export const updateTraveler = async (id, traveler) => {
  const response = await axios.put(`${API_URL}/traveler/${id}`, traveler);
  return response.data;
};

export const deleteTraveler = async (id) => {
  const response = await axios.delete(`${API_URL}/traveler/${id}`);
  return response.data;
};
export const getAllappointment = async () => {
  const response = await axios.get(`${API_URL}/appointment`);
  return response.data;
};

export const getappointmentById = async (busno) => {
  const response = await axios.get(`${API_URL}/appointment/${busno}`);
  return response.data;
};

export const addappointment = async (appointment) => {
  const response = await axios.post(`${API_URL}/appointment`, appointment);
  return response.data;
};

export const updateappointment = async (busno, appointment) => {
  const response = await axios.put(`${API_URL}/appointment/${busno}`, appointment);
  return response.data;
};

export const deleteappointment = async (busno) => {
  const response = await axios.delete(`${API_URL}/appointment/${busno}`);
  return response.data;
};
export const getAllhistory = async () => {
  const response = await axios.get(`${API_URL}/viewhistory`);
  return response.data;
};
export const getrequsetwaiting = async () => {
  const response = await axios.get(`${API_URL}/request`);
  return response.data;
};
export const accept = async (userid ,request) => {
  const response = await axios.put(`${API_URL}/accept/${userid}`, request);
  return response.data;
};
export const Decline = async (userid, request) => {
  const response = await axios.put(`${API_URL}/decline/${userid}`, request);
  return response.data;
};

export const getacceptuser = async () => {
  const response = await axios.get(`${API_URL}/acceptuser`);
  return response.data;
};
export const getdeclineuser = async () => {
  const response = await axios.get(`${API_URL}/declineuser`);
  return response.data;
};
export const getAllsearchhistory = async () => {
  const response = await axios.get(`${API_URL}/searchhistory`);
  return response.data;
};
export const addsearch = async (search) => {
  const response = await axios.post(`${API_URL}/addsearchhistory`, search);
  return response.data;
};
// export const addsearch = async (searchCriteria) => {
//   try {
//     const response = await axios.get(`${API_URL}//addsearchhistory/`, { params: searchCriteria });
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };