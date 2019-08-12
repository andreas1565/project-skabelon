/**
 * @module controler/products
 */
/**
     * denne fuktion renderer products.ejs med data 
     * @param {Object} req er et object
     * @param {Function} res er en Function callback
     * @param {Function} next er en Function callback
*/
exports.products = function (req, res, next){
   
    res.render('products', { "title": 'products', "content": 'kaffepause' });
}; 