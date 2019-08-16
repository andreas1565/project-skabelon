const {get, post} = require('../controllers/signup.controller')
module.exports = function(app){
     /**
     * denne fuktion håndter get metoden for endpointet /signup 
     * @param {Function} app  express objektet
     */
    app.get('/signup',  get);
    /**
     * denne funktion håndterer post metoden for endpointet /signup
     * @param {Function} app express objektet
     */
    app.post('/signup', post);
}