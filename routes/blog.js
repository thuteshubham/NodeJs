const express = require('express');

const blogController=require('./../controllers/blogController')

let setRouter=(app)=>{
    

    app.get('/helloWorld',blogController.helloWorldFunction);
    app.get('/otherEx',blogController.otherExamplle)
} //end setRouter Function

module.exports={
    setRouter:setRouter
}