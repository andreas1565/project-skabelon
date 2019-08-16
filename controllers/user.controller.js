const db = require('../config/sql');
/**
 * @module controler/getusers
 */

/**
     * denne fuktion renderer getcategorie som er en table af alle data fra user 
     * @param {Object} req er et object
     * @param {Function} res er en Function callback
     * @param {Function} next er en Function callback 
*/
exports.getusers = async function(req,res,next){
    try {
        const usersql = `SELECT users.id, users.username, users.passphrase, profiles.email FROM users
        INNER JOIN profiles
        ON users.fk_profile = profiles.id`; 
        // Destructuring i sted for const users  res.render('users', { users: users[0] });
        const [rows,  fieilds] = await db.query(usersql);
       // console.log(rows);
       // console.log(fieilds);
        res.render('users', { users: rows });
        res.end();
    } catch (error) {
        console.log(error);
        res.send('fejl');
    }
};
/**
 * @module controler/showuserform
 */

/**
     * denne fuktion renderershowuserform som er en form med den enkelte user med hjælpe fra  req.params.id som er id fra  url 
     * @param {Object} req er et object
     * @param {Function} res er en Function callback
     * @param {Function} next er en Function callback og koncekvensen af next er den hopper videre til næste funktion 
*/
exports.showuserform = async function(req, res, next){
    try {
        const usersql = `SELECT users.id, users.username, profiles.email FROM users
        INNER JOIN profiles
        ON users.fk_profile = profiles.id 
        WHERE  users.id = :id`;
        const [rows, fieilds ] = await db.query(usersql, {id: req.params.id});
        res.render('edituser', { user: rows[0]}); 
    } catch (error) {
        console.log(error);
        res.send('fejl'); 
    }
};
/**
 * @module controler/edituser
 */

/**
     *  insæter data fra oprate user og insæter dem i databasen som en updatering  med hjælpe fra  req.params.id som er id fra  url  
     * @param {Object} req er et object
     * @param {Function} res er en Function callback
     * @param {Function} next er en Function callback og koncekvensen af next er den hopper videre til næste funktion 
*/
exports.edituser = async function(req, res, next){
    try {
        /*
        subquery er en sql sætning inde i en sætning
        (
            SELECT fk_profile from users
            WHERE id = :id 
        )
        */ 
       const usersql =  `UPDATE users SET username = :username WHERE id = :id`;
       const profilesql =  `UPDATE profiles SET email = :email 
        WHERE id = (
            SELECT fk_profile from users
            WHERE id = :id 
        )`;
        const user = await db.query(usersql, { id: req.params.id, username: req.fields.username });
        const profile = await db.query(profilesql, { id: req.params.id, email: req.fields.email });

        // req.route.path = //  /edituser/:id

        const path = req.route.path.replace(':id', '');
        res.redirect(path  + req.params.id);
    } catch (error) {
        console.log(error);
        res.send('fejl');  
    }
};
/**
 * @module controler/deleteuser
 */

/**
     * denne fuktion sletter en user med hjælpe fra  req.params.id som er id fra  url
     * @param {Object} req er et object
     * @param {Function} res er en Function callback
     * @param {Function} next er en Function callback og koncekvensen af next er den hopper videre til næste funktion 
*/
exports.deleteuser = async  function(req,res,next) {
    try {
        const usersql = `DELETE FROM profiles WHERE id = (
            SELECT fk_profile FROM users WHERE id = :id
        )`;
        await db.query(usersql, { id: req.params.id });
        res.redirect('/users');
    } catch (error) {
        console.log(error);
        res.send('fejl');  
    }
}