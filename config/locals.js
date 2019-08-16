module.exports = function(app){
    app.use(function(req,  res, next){
        if(typeof  req.app.locals.isloggedin === 'undefined'){
            req.app.locals.isloggedin = false;
        }
        
        next();
    })
}