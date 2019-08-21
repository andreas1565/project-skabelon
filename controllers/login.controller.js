const db = require('../config/sql');
const { compareSync } = require('bcryptjs');
/**
 * @module controler/getloginform
 */
/**
     * denne fuktion renderer login form
     * @param {Object} req er et object
     * @param {Function} res er en Function callback
     * @param {Function} next er en Function callback og koncekvensen af next er den hopper videre til næste funktion 
*/
exports.getloginform = function(req,  res, next){
    res.render('login');
};
/**
 * @module controler/logincheckfunctionality
 */

/**
     * denne fuktion tjeker om felterne er tom og hvis det man skriver i form passer med det der står i databaen så kommer man til det hemmligt 
     * @param {Object} req er et object
     * @param {Function} res er en Function callback
     * @param {Function} next er en Function callback og koncekvensen af next er den hopper videre til næste funktion 
*/
exports.logincheck = async function(req, res, next){
    let success = true;
    let errorMessage;
    if(req.fields.username === ""){
        errorMessage = "feltet brger navn er tom";
        success = false;
    }
    if(req.fields.password === ""){
        errorMessage = "feltet adganskode er tom";
        success = false;
    }
    if(success !== true){
        res.render("login",  {errorMessage});
         // return stopper fuction
        return;
    }

    try {
        const usersql = `SELECT users.id, users.passphrase, roles.level FROM users 
        INNER JOIN roles
        ON users.fk_role = roles.id
        WHERE username = :username`;
      
        const [rows] =  await db.query(usersql, {
            username: req.fields.username
        });        
        if(rows.length !== 1){
            res.redirect("/login");
        }

        // her tjekker jeg om det man skive i form, passer med det der står i databasen
        if(!compareSync(req.fields.password,  rows[0].passphrase)){
            res.redirect('/login');
        }
        req.session.isloggedin = true;
        req.session.user = rows[0].id;
        res.redirect(`/profile/${rows[0].id}`);
        req.app.locals.isloggedin = true;
        req.app.locals.userId = rows[0].id;
        req.app.locals.userlevel = rows[0].level;
        console.log(req.app.locals.userlevel);
    } catch (error) {
        console.log(error);
        res.send('felj');
    }
}

exports.logout = function(req, res, next){
    delete req.session.isloggedin;
    delete  req.session.user;
    delete  req.app.locals.isloggedin;
    delete  req.app.locals.userId;
    delete req.app.locals.userlevel;
    res.redirect('/login');
}