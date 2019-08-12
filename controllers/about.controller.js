/**
 * @module controler/about
 */

/**
     * denne fuktion renderer about.ejs med data 
     * @param {Object} req er et object
     * @param {Function} res er en Function callback
     * @param {Function} next er en Function callback
*/
exports.about = function (req, res, next){
   
    res.render('about', { "title": 'hej about', "content": 'kaffepause' });
}; 