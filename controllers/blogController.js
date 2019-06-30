const express=require('express');
const mongoose=require('mongoose');
//const shortid = require('short-id');

//importing the model here
const BlogModel = mongoose.model('Blog');

testRoute=(req,res)=>{
    console.log(req.params);
    res.send(req.params);
}

testQuery=(req,res)=>{
    console.log(req.query)
    res.send(req.query)
}

testBody=(req,res)=>{
    console.log(req.body);
    res.send(req.body);
}

module.exports={
    testRoute:testRoute,
    testQuery:testQuery,
    testBody:testBody
    
}


