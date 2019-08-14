const {getproducts, getcreateform, createproducts, showproductsform, editproducts, deleteproducts} = require('../controllers/products.controller');
/**
 *  products route
 * @module route/products
 */
module.exports =  function(app){
     /**
    * denne fuktion håndter get metoden for endpointet /products
     * @param {Function} app  express objektet
     */
    app.get('/products', getproducts);

    app.get('/createproducts', getcreateform);
    app.post('/createproducts', createproducts);

    app.get('/editproduct/:id', showproductsform);
    app.post('/editproduct/:id', editproducts);
    app.get('/deleteuser/:id', deleteproducts);
}
   
