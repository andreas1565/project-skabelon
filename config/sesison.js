 const session = require('express-session');
// hvad er en session svar en session bliver oprate når du som client forbiener til en server med for example en browser
// og der blive oprate en session id som bliver gemt både client og sreveren 
module.exports = function(app){
    app.use(session({
        secret: 'keyboard cat', // secret det er en nørlge til at crypter og decrypter sådan at data for er crypter man kan ikke læse data med mindre at du kender secret
        resave: true, // hvis resave er sat til true så tvinger vi session til at blive gemt tilbage på servers session store der på hardisken hvor sessoin bliver gemt selvom sessoin arlig blev ændre det vil sige man beholder en sessoin selvom det er uændre hvis der står true  
        saveUninitialized: true //  hvis saveUninitialized er sat true så bliver der reseret plas på serverens hardisk til session data
    }));
}