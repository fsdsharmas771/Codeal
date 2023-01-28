const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
//used for session cookie when using passport
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongodb-session')(session);
const sassMiddleware = require('node-sass-middleware');


app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}))
//middle-wares
app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));
// use express-ejs-layout
app.use(expressLayouts);
//extract styles and scripts from sub pages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// setup view engin
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'codeial',
    //TODO change the secret before deyployement in production mode
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store : new MongoStore(
        {
            mongooseConnection:db,
            autoRemove:'disabled'
        },
        function(err){
            console.log(err||'connect-mongodb setup OK');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
// use express router
app.use('/',require('./routes/index'));

app.listen(port,function(error){
    if(error){
        console.log(`Error in running server: ${error}`);
    }
    console.log(`Yepp!! Server is running on port: ${port}`);
})