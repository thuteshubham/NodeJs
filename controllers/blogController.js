const express=require('express');
const mongoose=require('mongoose')

//importing the model here
const BlogModel=mongoose.model('Blog')


let testRoute=(req,res)=>{
    console.log(req.params);
    res.send(req.params);}
   
let testQuery=(req,res)=>{
    console.log(req.params);
    res.send(req.query);}

let testBody=(req,res)=>{ 
    console.log(req.params);
    res.send(req.body);}

    module.exports={
        testRoute:testRoute,
        testQuery:testQuery,
        testBody:testBody
    }