// this is needed for importing expressjs into our application
const express = require('express')
const appConfig = require('./config/appConfig')
const fs = require('fs')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const globalErrorMiddleware=require('./middlewares/appErrorHandler');
const routeLoggerMiddleware=require('./middlewares/routeLogger');
const helmet=require('helmet');
const logger=require('./libs/loggerLib');
const http=require('http')

//declaring an instance or creating an application instance
const app = express()

//middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(helmet())

//own middlewares
app.use(globalErrorMiddleware.globlaErrorHandler);
app.use(routeLoggerMiddleware.logIp)



// Bootstrap models
let modelsPath = './models'
fs.readdirSync(modelsPath).forEach(function (file) {
    if (~file.indexOf('.js')) {
        console.log(file)
        require(modelsPath + '/' + file)
    }
  })
  // end Bootstrap models


// Bootstrap route
let routesPath = './routes'
fs.readdirSync(routesPath).forEach(function (file) {
    if (~file.indexOf('.js')) {
        console.log("including the following file");
        console.log(routesPath + '/' + file)
        let route = require(routesPath + '/' + file);
        route.setRouter(app);
    }
});
// end bootstrap route

//own middleware for route not found
app.use(globalErrorMiddleware.globalNotFoundErrorHandler)


//Now we will create our own Http server
const server=http.createServer(app)

//Start listening to Http server
console.log(appConfig);
server.listen(appConfig.port);
server.on('error',onError);
server.on('listening',onListening);


//event listener for Http server 'error' event

function onError(error){
    if(error.syscall !== 'listen'){
        logger.error(error.code+'not equal listen','serverOnErrorHandler',10);
        throw error
    }


//handle various eror code 
switch(error.code){
    case 'EACCESS':
        logger.error(error.code+':eleveted privilage required','erverOnErrorHandler',10);
        process.exit(1);
        break
    case 'EADDRINUSE':
        logger.error(error.code+':port is already in use.', 'serverOnErrorHandler', 10);
        process.exit(1);
        break
    default:
        logger.error(error.code + ':some unknown error occured', 'serverOnErrorHandler', 10)
        throw error    

  }
}


//event listening to Http server listening event

/*

//listening the server - creating a local server
app.listen(appConfig.port, () => {
    console.log('Example app listening on port 3000!');
    //creating the mongo db connection here
    let db = mongoose.connect(appConfig.db.uri, { useNewUrlParser: true });

})
*/

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address()
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    ('Listening on ' + bind)
    logger.info('server listening on port' + addr.port, 'serverOnListeningHandler', 10)
    let db = mongoose.connect(appConfig.db.uri, { useNewUrlParser: true })
}

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
    // application specific logging, throwing an error, or other logic here
})



// handling mongoose connection error
mongoose.connection.on('error', function (err) {
    console.log('database connection error');
    console.log(err)

}); // end mongoose connection error

// handling mongoose success event
mongoose.connection.on('open', function (err) {
    if (err) {
        console.log("database error");
        console.log(err);

    } else {
        console.log("database connection open success");
    }

}); // end mongoose connection open handler