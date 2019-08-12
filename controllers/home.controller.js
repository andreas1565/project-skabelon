/**
 * @module controler/home
 */

/**
     * denne fuktion renderer page.ejs med data 
     * @param {Object} req er et object
     * @param {Function} res er en Function callback
     * @param {Function} next er en Function callback
*/
exports.home = function (req, res, next){
    res.render('page', { "title": 'hej verden', "content": 'kaffepause' });
}; 