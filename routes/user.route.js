const {getusers, showuserform, edituser, usersupgrade,deleteuser} = require('../controllers/user.controller');
const isauthorized = require('../midleware/isauthorized');
const isemployee = require('../midleware/isemployee');
const isadmin = require('../midleware/isadmin');
module.exports = function(app){
     /**
     * denne fuktion håndter get metoden for endpointet /users 
     * @param {Function} app  express objektet
     */
    app.get('/dashboardusers',isauthorized, isemployee, getusers);
    /**
     * denne fuktion håndter get metoden for endpointet /edituser/:id 
     * @param {Function} app  express objektet
     */
    app.get('/dashboardedituser/:id', isauthorized, isadmin, showuserform);
     /**
     * denne funktion håndterer post metoden for endpointet /edituser/:id
     * @param {Function} app express objektet
     */
    app.post('/dashboardedituser/:id',isauthorized, isadmin, edituser);

    

    app.get('/dashboardusersupgrade/:id', isauthorized, isadmin, showuserform);
    /**
     * denne fuktion håndter get metoden for endpointet /usersupgrade/:id 
     * @param {Function} app  express objektet
     */

    app.post('/dashboardusersupgrade/:id', isauthorized, isadmin, usersupgrade);

     /**
     * denne funktion håndterer post metoden for endpointet /usersupgrade/:id
     * @param {Function} app express objektet
     */

    /**
     * denne fuktion håndter get metoden for endpointet /deleteuser/:id
     * @param {Function} app  express objektet
     */
    app.get('/dashboarddeleteuser/:id',isauthorized, isadmin, deleteuser);
}