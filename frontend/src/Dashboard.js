import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Dashboard(){
 const [items,setItems]=useState([]);
 const [itemName,setItemName]=useState("");
 const [search,setSearch]=useState("");
 const [editId,setEditId]=useState(null);
 const [editName,setEditName]=useState("");
 const navigate = useNavigate();

 const token = localStorage.getItem("token");

 useEffect(()=>{
  if(!token) navigate("/");
  fetchItems();
 },[]);

 const fetchItems = async()=>{
  const res = await axios.get('http://localhost:5000/api/items');
  setItems(res.data);
 };

 const addItem = async()=>{
  await axios.post('http://localhost:5000/api/items',{itemName},{headers:{authorization:token}});
  fetchItems();
 };

 const deleteItem = async(id)=>{
  await axios.delete(`http://localhost:5000/api/items/${id}`,{headers:{authorization:token}});
  fetchItems();
 };

 const updateItem = async()=>{
  await axios.put(`http://localhost:5000/api/items/${editId}`,
  {itemName:editName},{headers:{authorization:token}});
  setEditId(null);
  fetchItems();
 };

 const searchItems = async()=>{
  const res = await axios.get(`http://localhost:5000/api/items/search?name=${search}`);
  setItems(res.data);
 };

 const logout = ()=>{
  localStorage.removeItem("token");
  navigate("/");
 };

 return(
  <div className="container">
   <h2>Dashboard</h2>
   <button className="btn btn-danger" onClick={logout}>Logout</button>

   <input className="form-control mt-3" placeholder="Item name" onChange={e=>setItemName(e.target.value)}/>
   <button className="btn btn-primary mt-2" onClick={addItem}>Add Item</button>

   <input className="form-control mt-3" placeholder="Search" onChange={e=>setSearch(e.target.value)}/>
   <button className="btn btn-info mt-2" onClick={searchItems}>Search</button>

   {items.map(i=>(
    <div key={i._id} className="mt-3">
      {editId===i._id?(
        <>
         <input className="form-control" onChange={e=>setEditName(e.target.value)}/>
         <button className="btn btn-success mt-1" onClick={updateItem}>Save</button>
        </>
      ):(
        <>
         <p>{i.itemName}</p>
         <button className="btn btn-warning" onClick={()=>setEditId(i._id)}>Edit</button>
         <button className="btn btn-danger ms-2" onClick={()=>deleteItem(i._id)}>Delete</button>
        </>
      )}
    </div>
   ))}
  </div>
 );
}
export default Dashboard;