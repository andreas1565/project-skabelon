// hvis du ville importere en standard funktion skal der stå i din  controllerfil moduel.exports = funktion og det er et module
// hvis du vil have en eller flere funktioner importeret skal du i din controllerfil skrive exports = funktion  og det er et module
// test som vist i {} er navnet på en funktion i controller stien vise i ''  
const {home} = require('../controllers/home.controller.js');

/**
 *  home route
 * @module route/home
 */
module.exports = function(app)  {
    /**
     * denne fuktion håndter get metoden for endpointet /
     * @param {Function} app  express objektet
     */
 
    app.get('/', home);
    
    /**
     * denne funktion håndterer post metoden for endpointet /
     * @param {Function} app express objektet
     */
   
        app.post('/', home);
};
    
