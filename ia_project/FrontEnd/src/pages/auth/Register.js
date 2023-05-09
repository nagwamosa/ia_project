import React, { useState } from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../css/Login.css";
import Alert from 'react-bootstrap/Alert';
import axios from "axios";
import { setAuthUser } from "../../helper/storage";
import { useNavigate } from "react-router-dom";



const Register = () => {
  const naviagte =useNavigate();
  const [register,setRegister]= useState({
    name:"",
   email:'',
   password:'',
   phone:'',
   loading: false,
   err:[],
 
  })
  const registerFun = (event) => {
   event.preventDefault();
   setRegister({...register,loading: true,err:[]});
   axios.post("http://localhost:4000/register",{
    name:register.name,
     email:register.email,
     password:register.password,
     phone:register.phone
   }).then(resp=>{
     setRegister({...register,loading:false,err:[]});
     setAuthUser(resp.data)
     naviagte("/Login")
 
   }).catch(errors=>{
     console.log(errors);
     setRegister({...register,loading:false,err:errors.response.data.errors});
   })
   console.log(register);
 }


  return (
    <div className="login-container">
    <h2>Registration Form</h2>
    {register.err.map((error,index)=>(
      <Alert key={index} className="px-2 py-2" variant="danger">
          {error.msg}
        </Alert>
      ))}
      <Form onSubmit={registerFun}>
      <Form.Group className="mb-3" controlId="register-name">
          <Form.Label>Name:</Form.Label>
          <Form.Control type="text" placeholder="Full Name" 
          required 
          value={register.name} 
          onChange={(event)=>setRegister({...register,name:event.target.value})} 
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="register-email"  >
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" placeholder="Email" 
          required 
          value={register.email} 
          onChange={(event)=>setRegister({...register,email:event.target.value})}
           />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="register-password">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" placeholder="Password" 
          required 
          value={register.password} 
          onChange={(event)=>setRegister({...register,password:event.target.value})}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="register-phone">
        <Form.Label>Phone:</Form.Label>
        <Form.Control type="phone" placeholder="Phone" 
        required 
          value={register.phone} 
          onChange={(event)=>setRegister({...register,phone:event.target.value})}
        />
      </Form.Group>
      
        <Button className="btn btn-dark"   variant="primary" type="submit" disabled={register.loading===true}>
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default Register