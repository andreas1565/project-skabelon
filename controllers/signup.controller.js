const db = require('../config/sql');
// Destructuring i sted for at hente hele bcryptjs bibliotek så jeg henter kun den funktion jeg skal bruge som er hashSync
const { hashSync } = require('bcryptjs');
/**
 * @module controler/getsignupformen
 */
/**
     * denne fuktion renderer signup formen
     * @param {Object} req er et object
     * @param {Function} res er en Function callback
     * @param {Function} next er en Function callback og koncekvensen af next er den hopper videre til næste funktion
*/
exports.get = function(req , res , next) {
    res.render('signup');
};
/**
 * @module controler/signupfunctionality
 */

/**
     * denne fuktion tjeker om felterne er tom og insæter data fra oprate bruger formen og insæter dem i databasen med hash password
     * @param {Object} req er et object
     * @param {Function} res er en Function callback
     * @param {Function} next er en Function callback og koncekvensen af next er den hopper videre til næste funktion
*/
exports.post = async function(req, res ,next) {  
    // backend validating 
     let success = true;
    let errorMessage;
    if(req.fields.passphrase === ""){
        errorMessage = "feltet adganskode er tom";
        success = false;
    }
    if(req.fields.passphrase  != req.fields.retenterpassphrase){
        success = false;
        errorMessage = 'password match ikkke';
    }
    if(req.fields.username === ""){
        errorMessage = "feltet brger navn er tom";
        success = false;
    }
    if(req.fields.email === ""){
        errorMessage = "feltet brger email er tom";
        success = false;
    }
    if(success !== true){
        res.render("signup",  {errorMessage, ...req.fields});
         // return stopper fuction
        return;
    }
   try {
       const profilesql = `INSERT INTO  profiles SET email = :email`
       const usersql = `INSERT INTO users SET username = :username, passphrase = :password, fk_profile = :fk, fk_role = 3`;
       const profile = await db.query(profilesql, {email: req.fields.email})
       // hashSync skal bruge det felt man vil hashe og 10 talet er en salt som kører en string igennem 10 gange 
      // i computerens prosessor hvilket vil sige jo højere tallet er jo længere skal computeren tænke sig om
       const hashpassword = hashSync(req.fields.passphrase, 10)
       const user = await db.query(usersql, {
        password:  hashpassword,
        username: req.fields.username,
        fk: profile[0].insertId
       });
      res.send("du er nu oprettet som bruger tillykke! :)");
   } catch (error) {
       console.log(error);
       if(error.code === 'ER_DUP_ENTRY'){
            // return stopper fuction
           return res.send("denne bruger eksisterer allerede");
       }
       res.send('fejl');
   }
};