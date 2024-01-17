const express = require("express");
//database connected using mongoose
const mongoose=require("mongoose");
const User=require("../models/UseModel")

const router = express.Router();

//create operations 
router.post("/",async(req,res)=>
{
    const {name,email,age}=req.body;

    try {
        const userAdded =await User.create({
            name:name,
            email:email,
            age:age,
        });
        //to provide response in frontend
        res.status(201).json(userAdded);
        
    } catch (error) {
        console.log(error);
        res.send(400).json({error:error.message})
    }
    
});


//get

router.get("/",async(req,res)=>
{
    try {
    const showAll = await User.find();
    res.status(200).json(showAll);      
} catch (error) {
    console.log(error);
    res.send(500).json({error:error.message});
}

// res.send("api is running ")
});

// get single user 
router.get("/:id",async(req,res)=>
{    
    const{id}=req.params;
    try {
    const singleUser = await User.findById({_id : id});
    res.status(200).json(singleUser);      
} catch (error) {
    console.log(error);
    res.send(500).json({error:error.message});
}

});

//delet

router.delete("/:id",async(req,res)=>
{    
    const{id}=req.params;
    try {
    // findIdAndDelete -- function to delet user
    const singleUser = await User.findByIdAndDelete({_id : id});
    res.status(200).json(singleUser);      
} catch (error) {
    console.log(error);
    res.send(500).json({error:error.message});
}

});


//put / patch 

router.patch("/:id",async(req,res)=>
{    
    const{id}=req.params;
    const{name,email,age}=req.body;
    try {
    // findIdAndDelete -- function to delet user
    const UpdateUser = await User.findByIdAndUpdate(id,req.body,{new:true,});
    res.status(200).json(UpdateUser);      
} catch (error) {
    console.log(error);
    res.send(500).json({error:error.message});
}

});



module.exports=router;