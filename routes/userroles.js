const {getusersroles, getusersrolesform, createusersroles, showuserrolesform, editusersroles,  deleteuserroles} = require('../controllers/user.controller');
const isauthorized = require('../midleware/isauthorized');
const isemployee = require('../midleware/isemployee');
const isadmin = require('../midleware/isadmin');
module.exports = function(app){
     /**
     * denne fuktion håndter get metoden for endpointet /dashboard/userroles 
     * @param {Function} app  express objektet
     */
    app.get('/dashboard/user/roles', getusersroles);

    /**
    * denne fuktion håndter get metoden for endpointet /createuserroles
     * @param {Function} app  express objektet
     */
    app.get('/dashboard/create/users/roles',isauthorized, isadmin,  getusersrolesform);

     /**
     * denne funktion håndterer post metoden for endpointet /createcategorie
     * @param {Function} app express objektet
     */
    app.post('/dashboard/create/users/roles', isauthorized, isadmin, createusersroles);

    /**
     * denne fuktion håndter get metoden for endpointet /userroles/:id 
     * @param {Function} app  express objektet
     */
    app.get('/dashboard/edit/users/roles/:id', isauthorized,  isadmin, showuserrolesform);

    /**
     * denne funktion håndterer post metoden for endpointet /editproduct/:id
     * @param {Function} app express objektet
     */
    app.post('/dashboard/edit/users/roles/:id',isauthorized, isadmin, editusersroles);

    /**
     * denne fuktion håndter get metoden for endpointet /deletecategorie/:id
     * @param {Function} app  express objektet
     */
    app.get('/dashboard/delet/users/roles/:id',isauthorized, isadmin, deleteuserroles);
}