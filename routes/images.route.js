const {getimages, showimagesform,  editimages,  deleteimages, setprimary} = require('../controllers/images.controller');
const isauthorized = require('../midleware/isauthorized');
const isemployee = require('../midleware/isemployee');
const isadmin = require('../midleware/isadmin');
module.exports = function(app){
    /**
    * denne fuktion håndter get metoden for endpointet /dashboard/setprimary/:productsid/:imagesid gør at man kan vælge et nyt primary billede
     * @param {Function} app  express objektet
     */
    app.get('/dashboard/setprimary/:productsid/:imagesid',  isauthorized, isadmin, setprimary);
    
    /**
    * denne fuktion håndter get metoden for endpointet /images
     * @param {Function} app  express objektet
     */
    app.get('/dashboard/images', isauthorized, isemployee,getimages);

     /**
     * denne fuktion håndter get metoden for endpointet /editimage/:id
     * @param {Function} app  express objektet
     */

    app.get('/dashboard/edit/image/:id', isauthorized, isadmin, showimagesform);

    /**
     * denne funktion håndterer post metoden for endpointet /editimage/:id
     * @param {Function} app express objektet
     */

    app.post('/dashboard/edit/image/:id',isauthorized, isadmin, editimages);
    /**
     * denne fuktion håndter get metoden for endpointet /deleteimage/:id
     * @param {Function} app  express objektet
     */
    app.get('/dashboard/deleteimage/:id', isauthorized, isadmin, deleteimages);
}