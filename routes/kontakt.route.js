const {kontakt} = require('../controllers/kontakt.controller');
/**
 *  kontakt route
 * @module route/kontakt
 */
/**
    * denne fuktion håndter get metoden for endpointet /kontakt
     * @param {Function} app  express objektet
     */
module.exports = function(app){
    app.get('/kontakt', kontakt);
}
