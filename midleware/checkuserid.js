module.exports = function(req, res, next){
    // tar en vilken some helt datatype og laver den om til et number
    if(req.session.user ===  parseInt(req.params.id)){
        return next();
    }else{
        res.redirect("/profile/" + req.session.user);
        return;
    }
};