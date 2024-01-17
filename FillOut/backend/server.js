const express = require("express");
const app = express();
//database connected using mongoose
const mongoose=require("mongoose");

//this database is not secure in server.js file so we have to create new file
//.env file
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

app.use(cors());


const UserRoute = require("./routes/UserRoute");
//data in json converted to backend
app.use(express.json());

//use info from .env file
mongoose
.connect(process.env.URI)
.then(()=>
{
    console.log("connected successfull");
    //if connected then only server run as we put app.listen here 
     app.listen(process.env.PORT || 8000,(err)=>
{
    if(err)console.log(err);
    console.log("running successfully at ",process.env.PORT);
});

}).catch((error)=>
{
    console.log("error",error);
});

//both are same --- > only have to change this request as -->> http://localhost:5000/api/user
// app.use("/api/user",UserRoute);
  
// ----->> for below request --> http://localhost:5000
app.use(UserRoute);


