const isathenticated = require('../midleware/isauthencation');
const checkuserid = require("../midleware/checkuserid");
const {showuserform, edituser} = require('../controllers/user.controller');
module.exports = function(app){
    app.get('/profile/:id', [isathenticated, checkuserid], showuserform);
    app.post('/profile/:id', [isathenticated, checkuserid], edituser);
}