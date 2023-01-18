const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

//middle-wares
app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));
// use express-ejs-layout
app.use(expressLayouts);
//extract styles and scripts from sub pages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
// use express router
app.use('/',require('./routes/index'));

// setup view engin
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(error){
    if(error){
        console.log(`Error in running server: ${error}`);
    }
    console.log(`Yepp!! Server is running on port: ${port}`);
})