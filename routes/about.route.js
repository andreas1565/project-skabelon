const {about} = require('../controllers/about.controller');
/**
 *  products about
 * @module route/about
 */
 /**
    * denne fuktion håndter get metoden for endpointet /about
     * @param {Function} app  express objektet
     */
module.exports = function(app){
    app.get('/about', about);
}
   
