const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const system = require('./config/system');
const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");
const database = require("./config/database");
const app= express();
require('dotenv').config();
app.use(methodOverride('_method')); //override method
app.use(bodyParser.urlencoded({ extended: false })); //dung du lieu cua form, req.body
//conect database
const port = process.env.PORT;  
database.connect();
//end db
//flash
app.use(cookieParser('secret'));
app.use(session({
    cookie: { maxAge: 60000 },
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
}));
app.use(flash());
//end flash
// tinymce 
app.use(
    '/tinymce',
    express.static(path.join(__dirname, 'node_modules', 'tinymce')));
//end tinymce
//pug
app.set("views" , "./views");
app.set("views" , `${__dirname}/views`);
app.set("view engine", "pug");
//end pug
app.use(express.static("public"));
app.use(express.static(`${__dirname}/public`));
route(app);
routeAdmin(app);
//app locatiom var
app.locals.prefixAdmin = system.prefixAdmin;
app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}`);
})