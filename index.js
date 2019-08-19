/* hvad bruger man index.js. til ?
   alt hvad App´en har brug for  er samlet index.js det er lidt som en indholdsfortegelse hvad handler bogen om */
// reguire, const express, cconst app er de vigtigste for at programmet kan køre
require('dotenv').config(); 
const express = require('express');
// her eksikverer jeg funktionen express så man kan bruge express
const app = express();
// vi configurerer så express ved hvad en session er og hvad det statiske mappe er og hvad parser, views er
require('./config/sesison')(app);
require('./config/public')(app,  express);
require('./config/parser')(app);
require('./config/locals')(app);
require('./config/views')(app);
//hvis du ville require() et object med en function inde i så kan du requrie og derefter skive stine til den route file og skive navn på fuction og sender app med som parameteret for at kunne bruge app.get for example
//require('./routes/test.route.js').get(app);
// function der  bliver importert
/* module.exports =  {
    get: function(app){
        app.get('/about', about);
    }
}*/

//hvis du ville requre en function så skal du require og derefter skive stien til route og sender app med som parameteret for at kunne bruge app.get for example
//require('./routes/game/start.route')(app);
// function der  bliver importert
// app.get('/start', start);

// hvad  er et route - er den tager imod et reguist til et specifikt inpoint som sætter en controller igang som giver en  form for response f.eks render en side
require('./routes/home.route.js')(app);
require('./routes/home.route.js')(app);
require('./routes/about.route')(app);
require('./routes/kontakt.route.js')(app);
require('./routes/products.route.js')(app);
require('./routes/categorie.route')(app);
require('./routes/singup.route')(app);
require('./routes/login.route')(app);
require('./routes/user.route')(app);
require('./routes/profile.route')(app);
require('.//routes/dashboard.route')(app);


require('./server/server')(app);