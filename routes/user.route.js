const {getusers, showuserform, edituser, deleteuser} = require('../controllers/user.controller');

module.exports = function(app){
    app.get('/users', getusers);
    app.get('/edituser/:id',  showuserform);
    app.post('/edituser/:id', edituser);
    app.get('/deleteuser/:id', deleteuser);
}