const express=require('express');
const mongoose=require("mongoose");
const app=express();
mongoose.connect("mongodb+srv://admin18:kwHuiGbTH0csSE7C@cluster0.slgrb0q.mongodb.net/authn_authz?retryWrites=true&w=majority").then(()=>
{
    app.listen(5000);
    console.log("database is connected ! listening localhost 5000");
}).catch((err)=> console.log(err));
// app.use('/',(req,res,next)=>
// {
//     res.send("helloo dear!!");
// });


// app.listen(5000,()=>
// {
//     console.log("listning localhost 5000");

// })