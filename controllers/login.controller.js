const db = require('../config/sql');
const { compareSync } = require('bcryptjs');
exports.getloginform = function(req,  res, next){
    res.render('login');
};

exports.logincheck = async function(req, res, next){
    try {
        const usersql = `SELECT id, passphrase FROM users WHERE username = :username`;
        const [rows] =  await db.query(usersql, {
            username: req.fields.username
        });

        
        if(rows.length !== 1){
            res.redirect("/login");
        }


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