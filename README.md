## Lise over  npm pakker
* Dotenv er et modul der sørger for at vi kan bruge .env, så alle database informationer ikke står i en fil. Hvis man bliver hacket, kan hackeren ikke se database informationerne mere.

* Ejs står for Embedded JavaScript templating, som gør at vi kan dele html elementet op i partials. det er også en template engine.

* Express er et framework til node js, det er til at lave webapplikationer,  og her bruger vi det til at lave en http server og det er nemmere at lave route og at sætte middelware for andre pakker på.

* Express-sestion er et middleware til Express som gør at vi kan beskytte routes som skal være for speciticeret brugere .

* Mysql2, det gør at man kan tilknytte en databasen. og skrive sql i koden så vi kan f.eks. hente data oprette data, opdatere data og slette data.

* Morgan, den logger http request http status code og et timestamp og det inde i '' er hvordan man kan formater hvor det skal se ud i terminalen

* nodemon er et værktøj som gør at serveren kan genstarte sig selv automatisk.

* Express-formidable er et modul der bruges til at passe indhold fra en form og den serder når form bliver submitte  en header med  application/formddata med request til et route så kan inde sætte data i en database forskellen på body-parser er at Express-formidable kan håndter fileupload

* bcryptjs er for at hash password så hvis man bliver hacket at hackerne ikke kan se password og skal bruge extra tid på at finde ud af hvad password er.


* express-log-errors er et middleware for at at logging af routes operationer bruger det til hvis er sker en fejl 404 eller 500 at det bliver lang i filer i mappen logs så der for du route fejlen http status og timstamp