const {getusersroles, getusersrolesform, createusersroles, showuserrolesform, editusersroles,  deleteuserroles} = require('../controllers/user.controller');
const isauthorized = require('../midleware/isauthorized');
const isemployee = require('../midleware/isemployee');
const isadmin = require('../midleware/isadmin');
module.exports = function(app){
     /**
     * denne fuktion håndter get metoden for endpointet /userroles 
     * @param {Function} app  express objektet
     */
    app.get('/userroles', getusersroles);

    /**
    * denne fuktion håndter get metoden for endpointet /createuserroles
     * @param {Function} app  express objektet
     */
    app.get('/createusersroles',isauthorized, isadmin,  getusersrolesform);

     /**
     * denne funktion håndterer post metoden for endpointet /createcategorie
     * @param {Function} app express objektet
     */
    app.post('/createusersroles', isauthorized, isadmin, createusersroles);

    /**
     * denne fuktion håndter get metoden for endpointet /userroles/:id 
     * @param {Function} app  express objektet
     */
    app.get('/editusersroles/:id', isauthorized,  isadmin, showuserrolesform);

    /**
     * denne funktion håndterer post metoden for endpointet /editproduct/:id
     * @param {Function} app express objektet
     */
    app.post('/editusersroles/:id',isauthorized, isadmin, editusersroles);

    /**
     * denne fuktion håndter get metoden for endpointet /deletecategorie/:id
     * @param {Function} app  express objektet
     */
    app.get('/deletusersroles/:id',isauthorized, isadmin, deleteuserroles);
}