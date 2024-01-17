import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

// import { useNavigate } from "react-router-dom";

const Create= ()=> {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [Age, setAge] = useState(0);
  const [error,setError]=useState("");
  const navigate = useNavigate();

console.log(name,email,Age);

const handleSubmit = async (e)=>
{
  e.preventDefault();
  const addUser = { name,email,Age};

  const response= await fetch("http://localhost:5000/",
  {
    method:"POST",
    body :JSON.stringify(addUser),
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
    console.log(result);
    setError("");
    setName("");
    setEmail("");
    setAge(0);
    navigate("/all");



  }
};

 
return (
  <div class="container my-2">
        {error && <div class="alert alert-danger">{error}</div>}
    <h1 class="h1 text-center">Fill the data</h1>
    <form className="form" onSubmit={handleSubmit}>
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
);
};

export default Create;