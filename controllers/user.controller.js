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
        res.render('dashboard/users', { users: rows });
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
     * denne fuktion renderershowuserform som er en form med den enkelte user med hjælpe fra  req.params.id som er id fra  url og kommer an på vil bruger rolle man logger ind med så kan man ændre bugger roller
     * @param {Object} req er et object
     * @param {Function} res er en Function callback
     * @param {Function} next er en Function callback og koncekvensen af next er den hopper videre til næste funktion 
*/
exports.showuserform = async function(req, res, next){
    try {
        /* så hvis man er admin eller højer så kan man rediger brugerroller */ 
        if(req.app.locals.userlevel >= 99){
            const rolessql = `SELECT id AS rolesid, name AS rolesname FROM test3.roles WHERE name != 'superadmin' `;
            const [rows2] = await db.query(rolessql);
            const usersql = `SELECT users.id, users.username, profiles.email, fk_role FROM users
            INNER JOIN profiles
            ON users.fk_profile = profiles.id 
            WHERE  users.id = :id`;
            const [rows, fieilds ] = await db.query(usersql, {id: req.params.id});
            res.render('dashboard/edituser', { user: rows[0], usersroles: rows2}); 
        } else{
            // kun hvis bruger navn og email 
            const usersql = `SELECT users.id, users.username, profiles.email FROM users
            INNER JOIN profiles
            ON users.fk_profile = profiles.id 
            WHERE  users.id = :id`;
            const [rows, fieilds ] = await db.query(usersql, {id: req.params.id});
            res.render('dashboard/edituser', { user: rows[0]});  
        }
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
    let success = true;
    let errorMessage;
    if(req.fields.username === ""){
        errorMessage = "feltet brger navn er tom";
        success = false;
    }
    if(req.fields.email === ""){
        errorMessage = "feltet brger email er tom";
        success = false;
    }
    if(success  !== true){
        const rolessql = `SELECT id AS rolesid, name AS rolesname FROM test3.roles WHERE name != 'superadmin' `;
        const [rows2] = await db.query(rolessql);
        const usersql = `SELECT users.id, users.username, profiles.email, fk_role FROM users
        INNER JOIN profiles
        ON users.fk_profile = profiles.id 
        WHERE  users.id = :id`;
        const [rows, fieilds ] = await db.query(usersql, {id: req.params.id});
        res.render('dashboard/edituser', { errorMessage,user: rows[0], usersroles: rows2});
        return;  
    }
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
 * @module controler/usersupgrade
 */

/**
     *  insæter data fra oprate user og insæter dem i databasen som en updatering  med hjælpe fra  req.params.id som er id fra  url  
     * @param {Object} req er et object
     * @param {Function} res er en Function callback
     * @param {Function} next er en Function callback og koncekvensen af next er den hopper videre til næste funktion 
*/
exports.usersupgrade = async function(req, res, next){
    try {
        const userrolessql =  `UPDATE users SET fk_role = :usersroles WHERE id = :id`;
        const userroles = await db.query(userrolessql, {
            usersroles: req.fields.usersroles,
            id: req.params.id
        }); 
        const path = req.route.path.replace(':id', '');
        res.redirect(path  + req.params.id); 
    } catch (error) {
        console.log(error);
        res.send('fejl');  
    }
}

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

/**
 * @module controler/getusersrolesform
 */

/**
     * denne fuktion renderer create-usersroles så er oprate brugerrole form 
     * @param {Object} req er et object
     * @param {Function} res er en Function callback
     * @param {Function} next er en Function callback og koncekvensen af next er den hopper videre til næste funktion
*/
exports.getusersrolesform = function(req , res , next) {
    res.render('dashboard/create-usersroles');
};

/**
 * @module controler/createusersroles
 */

/**
     * denne fuktion tjeker om felterne er tom og insæter data fra oprate kategorie formen og insæter dem i databasen
     * @param {Object} req er et object
     * @param {Function} res er en Function callback
     * @param {Function} next er en Function callback og koncekvensen af next er den hopper videre til næste funktion
*/

exports.createusersroles = async function(req, res ,next) {
    let success = true;
    let errorMessage;
    if(req.fields.name === ""){
        errorMessage = "feltet brger navn er tom";
        success = false;
    }
    if(req.fields.level === ""){
        errorMessage = "feltet brger email er tom";
        success = false;
    }
    if(isNaN(req.fields.level) === ""){
        success = false;
        errorMessage = 'du kan kun skrive tal i level feltet';
    }

    if(success !== true){
        res.render('dashboard/create-usersroles', {errorMessage});
    }

   try {
       const usersql = `INSERT INTO roles SET name = :name, level = :level`;
       const user = await db.query(usersql, {
        name:  req.fields.name,
        level: req.fields.level
       });
       res.redirect('/userroles');
   } catch (error) {
       console.log(error);
       if(error.code === 'ER_DUP_ENTRY'){
            // return stopper fuction
           return res.send("denne bruger eksisterer allerede");
       }
       res.send('fejl');
   }
};

/**
 * @module controler/getusersroles
 */

/**
     * denne fuktion renderer getcategorie som er en table af alle data fra user 
     * @param {Object} req er et object
     * @param {Function} res er en Function callback
     * @param {Function} next er en Function callback 
*/
exports.getusersroles = async function(req,res,next){
    try {
        const usersql = `SELECT id, name, level FROM roles`; 
        // Destructuring i sted for const users  res.render('users', { users: users[0] });
        const [rows,  fieilds] = await db.query(usersql);
       // console.log(rows);
       // console.log(fieilds);
        res.render('dashboard/usersroles', { usersroles: rows });
        res.end();
    } catch (error) {
        console.log(error);
        res.send('fejl');
    }
};

/**
 * @module controler/showuserroleform
 */

/**
     * denne fuktion renderer showuserrolesform som er en form med den enkelte user med hjælpe fra  req.params.id som er id fra  url 
     * @param {Object} req er et object
     * @param {Function} res er en Function callback
     * @param {Function} next er en Function callback og koncekvensen af next er den hopper videre til næste funktion 
*/
exports.showuserrolesform = async function(req, res, next){
    try {
        const usersql = `SELECT id, name, level FROM roles
        WHERE id = :id`;
        const [rows, fieilds ] = await db.query(usersql, {id: req.params.id});
        res.render('dashboard/editusersroles', { userroles: rows[0]}); 
    } catch (error) {
        console.log(error);
        res.send('fejl'); 
    }
};

/**
 * @module controler/usersroles
 */

/**
     *  insæter data fra oprate editusersroles og insæter dem i databasen som en updatering  med hjælpe fra  req.params.id som er id fra  url  
     * @param {Object} req er et object
     * @param {Function} res er en Function callback
     * @param {Function} next er en Function callback og koncekvensen af next er den hopper videre til næste funktion 
*/
exports.editusersroles = async function(req, res, next){
    let success = true;
    let errorMessage;
    if(req.fields.name === ""){
        errorMessage = "feltet brger navn er tom";
        success = false;
    }
    if(req.fields.level === ""){
        errorMessage = "feltet brger email er tom";
        success = false;
    }
    if(isNaN(req.fields.level) === ""){
        success = false;
        errorMessage = 'du kan kun skrive tal i level feltet';
    }
    if(success !==  true){
        const usersql = `SELECT id, name, level FROM roles
        WHERE id = :id`;
        const [rows, fieilds ] = await db.query(usersql, {id: req.params.id});
        res.render('dashboard/editusersroles', { userroles: rows[0], errorMessage});
        return; 
    }

  try {
        const categoriesql = `UPDATE roles SET name = :name, level = :level  WHERE id = :id `;
        const  categorie = await db.query(categoriesql, {
            name: req.fields.name,
            level: req.fields.level,
            id: req.params.id
        });
        res.redirect('/editusersroles/' + req.params.id);
    } catch (error) {
        console.log(error);
        res.send('fejl'); 
    }
}

/**
 * @module controler/deleteuserroles
 */

/**
     * denne fuktion sletter en deleteuserroles med hjælpe fra  req.params.id som er id fra  url
     * @param {Object} req er et object
     * @param {Function} res er en Function callback
     * @param {Function} next er en Function callback og koncekvensen af next er den hopper videre til næste funktion 
*/
exports.deleteuserroles = async  function(req,res,next) {
    try {
        const usersql = `DELETE FROM roles WHERE id = :id`;
        await db.query(usersql, { id: req.params.id });
        res.redirect('/userroles');
    } catch (error) {
        console.log(error);
        res.send('fejl');  
    }
}