const { getloginform, logincheck } = require('../controllers/login.controller');
module.exports = function(app){
app.get('/login', getloginform);
app.post('/login', logincheck);
}