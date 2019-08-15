module.exports = function(req,  res, next){
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