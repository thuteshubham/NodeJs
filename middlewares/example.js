let exampleMiddleware=(req,res,next)=>{
    req.user={'firstName':'Shubham','lastName':'Thute'}
    next()
}

module.exports={
    exampleMiddleware:exampleMiddleware
}

