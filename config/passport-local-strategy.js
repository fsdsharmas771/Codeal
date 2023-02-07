const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true// for flash msg
    },
    function(req,email,password,done){
        // find user and establish identity
        User.findOne({email:email},function(err,user){
            if(err){
                req.flash('error',err);
                return done(err);
            }
            if(!user || user.password!=password){
                req.flash('error','Invalid Username/Password');
                return done(null,false);
            }
            return done(null,user);
        })
    }
));

// serializing the user to decide which key is to be kept into the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }
        return done(null,user);
    });
});

//fuctinoality to check if user is authenticated or not and we use this as middleware
passport.checkAuthentication = function(req,res,next){
    //if user is singed in then pass on the req to the next function(controller)
    if(req.isAuthenticated()){
        return next();
    }
    // if user is not signed in
    return res.redirect('/users/login');
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contain current signed in user from the session cookie and we are just sending this to locals for views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;