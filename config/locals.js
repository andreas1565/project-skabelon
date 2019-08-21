module.exports = function(app){
    app.use(function(req,  res, next){
        if(typeof  req.app.locals.isloggedin === 'undefined'){
            req.app.locals.isloggedin = false;
        }
        if(typeof  req.app.locals.userId === 'undefined'){
            req.app.locals.userId = false;
        }
        if(typeof req.app.locals.userlevel === "undefined"){
            req.app.locals.userlevel = false;
        }
        
        next();
    })
}