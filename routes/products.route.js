const {getproducts, getcreateform, createproducts, showproductsform, editproducts, deleteproducts} = require('../controllers/products.controller');
const isauthorized = require('../midleware/isauthorized');
const isemployee = require('../midleware/isemployee');
const isadmin = require('../midleware/isadmin');
/**
 *  products route
 * @module route/products
 */
module.exports =  function(app){
     /**
    * denne fuktion håndter get metoden for endpointet /products
     * @param {Function} app  express objektet
     */
    app.get('/products', isauthorized, isemployee, getproducts);
     /**
    * denne fuktion håndter get metoden for endpointet /createproducts
     * @param {Function} app  express objektet
     */
    app.get('/createproducts',isauthorized, isadmin,  getcreateform);
    /**
     * denne funktion håndterer post metoden for endpointet /createproducts
     * @param {Function} app express objektet
     */
    app.post('/createproducts', isauthorized, isadmin, createproducts);
     /**
     * denne fuktion håndter get metoden for endpointet /editproduct/:id 
     * @param {Function} app  express objektet
     */
    app.get('/editproduct/:id', isauthorized,  isadmin, showproductsform);
     /**
     * denne funktion håndterer post metoden for endpointet /editproduct/:id
     * @param {Function} app express objektet
     */
    app.post('/editproduct/:id',isauthorized, isadmin, editproducts);
    /**
     * denne fuktion håndter get metoden for endpointet /deletecategorie/:id
     * @param {Function} app  express objektet
     */
    app.get('/deleteproducts/:id',isauthorized, isadmin, deleteproducts);
}
   
