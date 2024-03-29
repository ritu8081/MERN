// import React from 'react'
import React, {useEffect, useState} from "react";
import {useNavigate,useParams} from "react-router-dom";



function Update() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [Age, setAge] = useState(0);
  const [error,setError]=useState("");

  const {id}= useParams();

  const navigate = useNavigate();
//get single user data
  const getSingleUser= async()=>
  {    const response = await fetch (`http://localhost:5000/${id}`)
    const result = await response.json();
    if(!response.ok)
    {
      console.log(result.error);
      setError(result.error);
    }

    if(response.ok)
    {
      setError("");
      console.log("updated user",result);
      setName(result.name);
      setEmail(result.email);
      setAge(result.age);

    }
  };

  //send updated data to backend
 const handleUpdate = async(e)=>
 {  e.preventDefault();
  const updatedUser = { name,email,Age};

  const response= await fetch(`http://localhost:5000/${id}`,
  {
    method:"PATCH",
    body :JSON.stringify(updatedUser),
    headers:{
      "Content-Type":"application/json",
    },
  });
  const result= await response.json();
  if (!response.ok) {
    console.log(result.error);
    setError(result.error);
  }
  if (response.ok) {
    setError("");
    navigate("/all");
  }

 };

  useEffect(() => {
    getSingleUser();

  }, []);
  


  return (
    <div class="container my-2">
    {error && <div class="alert alert-danger">{error}</div>}
<h1 class="h1 text-center">Edit the data</h1>
<form onSubmit={handleUpdate}>
  <div class="mb-3">
    <label class="form-label">Name</label>
    <input
      type="text"
      class="form-control"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  </div>
  <div class="mb-3">
    <label class="form-label">Email address</label>
    <input
      type="email"
      class="form-control"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  </div>
  <div class="mb-3">
    <label class="form-label">Age</label>
    <input
      type="number"
      class="form-control"
      value={Age}
      onChange={(e) => setAge(e.target.value)}
    />
  </div>
  <button type="submit" class="btn btn-primary">
    Submit
  </button>
</form>
</div>
  )
}

export default Update