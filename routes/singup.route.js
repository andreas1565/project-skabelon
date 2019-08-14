const {get, post} = require('../controllers/signup.controller')
module.exports = function(app){
    app.get('/signup',  get);
    app.post('/signup', post);
}