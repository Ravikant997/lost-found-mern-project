import React,{useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Register(){
 const [name,setName]=useState("");
 const [email,setEmail]=useState("");
 const [password,setPassword]=useState("");
 const navigate = useNavigate();

 const register = async()=>{
  await axios.post('http://localhost:5000/api/auth/register',{name,email,password});
  navigate("/");
 };

 return(
  <div className="container">
   <h2>Register</h2>
   <input className="form-control" placeholder="Name" onChange={e=>setName(e.target.value)}/>
   <input className="form-control mt-2" placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
   <input className="form-control mt-2" type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
   <button className="btn btn-success mt-2" onClick={register}>Register</button>
  </div>
 );
}
export default Register;