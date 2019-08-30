/**
 * @module controler/kontakt
*/

/**
     * denne fuktion renderer kontakt.ejs med data 
     * @param {Object} req er et object
     * @param {Function} res er en Function callback
     * @param {Function} next er en Function callback
*/
exports.kontakt = function (req, res, next){
    res.render('frontend/page', {"title": "kontakt", "content": 'kaffepause'})
}