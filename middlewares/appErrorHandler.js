let errorHandler=(err,req,res,next)=>{
    console.log("Application error handler called");
    console.log(err);
    res.send("some error occured at global level");
}
let notFoundHandler=(req,res,next)=>{
    console.log("global route not found error handler called");
    res.status(404).send("route not found in application");
}
module.exports={
    globlaErrorHandler:errorHandler,
    globalNotFoundErrorHandler:notFoundHandler
}
