// denne funktion  gør at man ikke kan ændre sit id oppe i urlen
module.exports = function(req, res, next){
    // tar en vilken some helt datatype og laver den om til et number
    if(req.session.user ===  parseInt(req.params.id)){
         // return stopper fuction
        return next(); // er en Function callback og koncekvensen af next er den hopper videre til næste funktion
    }else{
        res.redirect("/profile/" + req.session.user);
         // return stopper fuction
        return;
    }
};