const express = require('express');

const blogController=require('./../controllers/blogController')

let setRouter=(app)=>{
    

    app.get('/test/route/:firstName/:lastName',blogController.testRoute);
    app.get('/test/query',blogController.testQuery);
    app.post('test/body',blogController.testBody);
} //end setRouter Function

module.exports={
    setRouter:setRouter
}