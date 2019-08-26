const {getimages, showimagesform,  editimages,  deleteimages} = require('../controllers/images.controller');
const isauthorized = require('../midleware/isauthorized');
const isemployee = require('../midleware/isemployee');
const isadmin = require('../midleware/isadmin');
module.exports = function(app){
    /**
    * denne fuktion håndter get metoden for endpointet /images
     * @param {Function} app  express objektet
     */
    app.get('/images', isauthorized, isemployee,getimages);

     /**
     * denne fuktion håndter get metoden for endpointet /editimage/:id
     * @param {Function} app  express objektet
     */

    app.get('/editimage/:id', isauthorized, isadmin, showimagesform);

    /**
     * denne funktion håndterer post metoden for endpointet /editimage/:id
     * @param {Function} app express objektet
     */

    app.post('/editimage/:id',isauthorized, isadmin, editimages);
    /**
     * denne fuktion håndter get metoden for endpointet /deleteimage/:id
     * @param {Function} app  express objektet
     */
    app.get('/deleteimage/:id', isauthorized, isadmin, deleteimages);
}