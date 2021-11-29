function auth(req,res,next){
    console.log("Autheticating....");
    next();
}

module.exports=auth;