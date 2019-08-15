module.exports = function(req,  res, next){
    // hvis der ikke er nogel session så bliver man smit tilbage til log in siden  
    if(!req.session){
        res.redirect("/login");
        // return stopper fuction
        return;
    }
    // true
    if(req.session.isloggedin){
        return next();
    }
    res.redirect("/login");
}