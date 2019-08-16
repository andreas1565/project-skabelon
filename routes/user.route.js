const {getusers, showuserform, edituser, deleteuser} = require('../controllers/user.controller');
const isauthorized = require('../midleware/isauthorized');
const isemployee = require('../midleware/isemployee');
const isadmin = require('../midleware/isadmin');
module.exports = function(app){
     /**
     * denne fuktion håndter get metoden for endpointet /users 
     * @param {Function} app  express objektet
     */
    app.get('/users',isauthorized, isemployee, getusers);
    /**
     * denne fuktion håndter get metoden for endpointet /edituser/:id 
     * @param {Function} app  express objektet
     */
    app.get('/edituser/:id', isauthorized, isadmin, showuserform);
     /**
     * denne funktion håndterer post metoden for endpointet /edituser/:id
     * @param {Function} app express objektet
     */
    app.post('/edituser/:id',isauthorized, isadmin, edituser);
    /**
     * denne fuktion håndter get metoden for endpointet /deleteuser/:id
     * @param {Function} app  express objektet
     */
    app.get('/deleteuser/:id',isauthorized, isadmin, deleteuser);
}