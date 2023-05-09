import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../css/Login.css";
import Alert from 'react-bootstrap/Alert';
import axios from "axios";
import { setAuthUser } from "../../helper/storage";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const naviagte =useNavigate();
 const [login,setLogin]= useState({
  email:'',
  password:'',
  loading: false,
  err:[],

 })
 const loginFun = (event) => {
  event.preventDefault();
  setLogin({...login,loading: true,err:[]});
  axios.post("http://localhost:4000/login",{
    email:login.email,
    password:login.password
  }).then(resp=>{
    setLogin({...login,loading:false,err:[]});
    setAuthUser(resp.data)
    naviagte("/")

  }).catch(errors=>{
    console.log(errors);
    setLogin({...login,loading:false,err:errors.response.data.errors});
  })
  console.log(login);
}
  return (
    <div className="login-container">
    <h2>Login Form</h2>
    {login.err.map((error,index)=>(
      <Alert key={index} className="px-2 py-2" variant="danger">
          {error.msg}
        </Alert>
      ))}
      
      <Form onSubmit={loginFun}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control 
          type="email" 
          placeholder="Email" 
          required 
          value={login.email} 
          onChange={(event)=>setLogin({...login,email:event.target.value})} 
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control 
          type="password" 
          placeholder="Password"
          required  
          value={login.password} 
          onChange={(event)=>setLogin({...login,password:event.target.value})}
          />
        </Form.Group>
        <Button className="btn btn-dark"   variant="primary" type="submit" disabled={login.loading===true}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;