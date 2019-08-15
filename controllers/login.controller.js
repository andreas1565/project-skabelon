const db = require('../config/sql');
const { compareSync } = require('bcryptjs');
exports.getloginform = function(req,  res, next){
    res.render('login');
};

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
        return;
    }

    try {
        const usersql = `SELECT id, passphrase FROM users WHERE username = :username`;
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
    } catch (error) {
        console.log(error);
        res.send('felj');
    }
}