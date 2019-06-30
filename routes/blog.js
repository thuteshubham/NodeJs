const express = require('express');
const blogController = require('./../controllers/blogController')


let setRouter = (app) => {

    app.get('test/route/:param1/:param2', blogController.testRoute);
    app.get('test/query', blogController.testQuery);
    app.get('test/body', blogController.testBody);
}


module.exports = {
    setRouter: setRouter
}