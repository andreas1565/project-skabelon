module.exports = function(app){
    app.use(function(req,  res, next){
        // typeof er du tjæker hvikelen type noget er
        if(typeof  req.app.locals.isloggedin === 'undefined'){
            req.app.locals.isloggedin = false;
        }
        // typeof er du tjæker hvikelen type noget er
        if(typeof  req.app.locals.userId === 'undefined'){
            req.app.locals.userId = false;
        }
        // typeof er du tjæker hvikelen type noget er
        if(typeof req.app.locals.userlevel === "undefined"){
            req.app.locals.userlevel = false;
        }
        
        next();
    })
}