const isathenticated = require('../midleware/isauthorized');
const checkuserid = require("../midleware/checkuserid");
const {showuserform, edituser} = require('../controllers/user.controller');
module.exports = function(app){
     /**
     * denne fuktion håndter get metoden for endpointet /profile/:id isathenticated er et middleware så beskyter profile og checkuserid  middleware  så gøre du ikke kan ændre tal og komme inde på en ande bruger
     * @param {Function} app  express objektet
     */
    app.get('/profile/:id', [isathenticated, checkuserid], showuserform);
    app.post('/profile/:id', [isathenticated, checkuserid], edituser);
}