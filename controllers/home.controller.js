const db = require('../config/sql');
/**
 * @module controler/home
 */

/**
     * denne fuktion renderer page.ejs med data 
     * @param {Object} req er et object
     * @param {Function} res er en Function callback
     * @param {Function} next er en Function callback
*/
exports.home = async function  (req, res, next){
   const  froendsql = `SELECT image, text from froendpage`;
    const ramdomproductssql = `SELECT  images.name AS imagesname, products.name AS productsname, products.id AS productsid, products.fk_categories  
    FROM products
    LEFT OUTER JOIN images
    ON images.fk_product = products.id AND images.primary = 1
    ORDER BY RAND() 
    LIMIT 3`; 
    const [froend] = await db.query(froendsql);
    const [ramdomproducts] = await db.query(ramdomproductssql);
    res.render('frontend/page', { "title": 'hej verden', "content": 'kaffepause', 'froend': froend[0], 'ramdomproducts': ramdomproducts});
}; 