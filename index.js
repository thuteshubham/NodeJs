
//this is needed for importing expressJs into application
const express=require('express');
const appConfig=require('./config/appConfig');

const fs=require('fs')

const mongoose=require('mongoose')

//const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')
//declaring an instance or creating an application intsance
const app=express()


//middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser())

//Bootstrap route
let routesPath='./routes'
fs.readdirSync(routesPath).forEach(function (file){
    if(file.indexOf('.js')){
        console.log("Indcluding the following file");
        console.log(routesPath+'/'+file);
        let route=require(routesPath+'/'+file);
        route.setRouter(app)
    }
});


//Bootstrap  Model
let modelPath='./models'
fs.readdirSync(modelPath).forEach(function (file){
    if(file.indexOf('.js')) require(modelPath+'/'+file)
})


//

let HelloWorldFunction=(req,res)=>res.send('hello world progra')

//first parameter is route and second one is myHelloWorld
app.get('/hello',HelloWorldFunction);


//listening the server
app.listen(appConfig.port,()=>
{
    console.log(`example app listening on port ${appConfig.port}`);

    //creating mongo db connection here

    
   let db=mongoose.connect(appConfig.db.uri,{useNewUrlParser: true});

   
  

})


//handling the mongoose connection error event
mongoose.connection.on('error',function(err){
    console.log('database connection error');
    console.log(err)
})

//handling the mongoose connection success event
mongoose.connection.on('open',function(err){
    if(err){
    console.log('databasde error');
    console.log(err);
} else {
    console.log('database connection open success');

}
})
