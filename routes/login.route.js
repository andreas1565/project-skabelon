const { getloginform, logincheck } = require('../controllers/login.controller');
module.exports = function(app){
  /**
     * denne fuktion håndter get metoden for endpointet /login 
     * @param {Function} app  express objektet
     */   
    app.get('/login', getloginform);
    /**
     * denne funktion håndterer post metoden for endpointet /login
     * @param {Function} app express objektet
     */
    app.post('/login', logincheck);
}