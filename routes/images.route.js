const {getimages, showimagesform,  editimages,  deleteimages} = require('../controllers/images.controller');
module.exports = function(app){
    /**
    * denne fuktion håndter get metoden for endpointet /images
     * @param {Function} app  express objektet
     */
    app.get('/images', getimages);

     /**
     * denne fuktion håndter get metoden for endpointet /editimage/:id
     * @param {Function} app  express objektet
     */

    app.get('/editimage/:id', showimagesform);

    /**
     * denne funktion håndterer post metoden for endpointet /editimage/:id
     * @param {Function} app express objektet
     */

    app.post('/editimage/:id', editimages);
    /**
     * denne fuktion håndter get metoden for endpointet /deleteimage/:id
     * @param {Function} app  express objektet
     */
    app.get('/deleteimage/:id', deleteimages);
}