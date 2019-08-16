const {getusers, showuserform, edituser, deleteuser} = require('../controllers/user.controller');

module.exports = function(app){
     /**
     * denne fuktion håndter get metoden for endpointet /users 
     * @param {Function} app  express objektet
     */
    app.get('/users', getusers);
    /**
     * denne fuktion håndter get metoden for endpointet /edituser/:id 
     * @param {Function} app  express objektet
     */
    app.get('/edituser/:id',  showuserform);
     /**
     * denne funktion håndterer post metoden for endpointet /edituser/:id
     * @param {Function} app express objektet
     */
    app.post('/edituser/:id', edituser);
    /**
     * denne fuktion håndter get metoden for endpointet /deleteuser/:id
     * @param {Function} app  express objektet
     */
    app.get('/deleteuser/:id', deleteuser);
}