const {products} = require('../controllers/products.controller');
/**
 *  products route
 * @module route/products
 */
module.exports =  function(app){
     /**
    * denne fuktion håndter get metoden for endpointet /products
     * @param {Function} app  express objektet
     */
    app.get('/products', products);
}
   
