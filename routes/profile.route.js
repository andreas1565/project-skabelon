const iscustomer = require('../midleware/iscustomer');
const isathenticated = require('../midleware/isauthorized');
const checkuserid = require("../midleware/checkuserid");
const {showuserform, edituser, froenduserform} = require('../controllers/user.controller');
module.exports = function(app){
    /**
     * denne fuktion håndter get metoden for endpointet /profile/:id det her en controller der give et response med en form hvor buger der har rolle customer kan se ders email og brugernav og et tomt feltet som jeg ville bruge til at opdater password 
     * @param {Function} app  express objektet
     */
    app.get('/profile/:id', iscustomer, froenduserform);
    
    app.post('/profile/:id', iscustomer, edituser);
    
    /**
     * denne fuktion håndter get metoden for endpointet /profile/:id isathenticated er et middleware så beskyter profile og checkuserid  middleware  så gøre du ikke kan ændre tal og komme inde på en ande bruger
     * @param {Function} app  express objektet
     */
    app.get('/dashboard/profile/:id', [isathenticated, checkuserid], showuserform);
      /**
     * denne funktion håndterer post metoden for endpointet /edituser/:id gør at customers briger kan updater bruger nav og en nye adgangskode og edituser er en function 
     * @param {Function} app express objektet
     */
    app.post('/dashboard/profile/:id', [isathenticated, checkuserid], edituser);
}