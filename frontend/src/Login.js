import React,{useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Login(){
 const [email,setEmail]=useState("");
 const [password,setPassword]=useState("");
 const navigate = useNavigate();

 const login = async()=>{
  const res = await axios.post('http://localhost:5000/api/auth/login',{email,password});
  localStorage.setItem("token",res.data.token);
  navigate("/dashboard");
 };

 return(
  <div className="container">
   <h2>Login</h2>
   <input className="form-control" placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
   <input className="form-control mt-2" type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
   <button className="btn btn-primary mt-2" onClick={login}>Login</button>
  </div>
 );
}
export default Login;