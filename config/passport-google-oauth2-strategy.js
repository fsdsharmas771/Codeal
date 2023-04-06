const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

//tell passport to use new strategy to google login
passport.use(new googleStrategy({
        clientID:'788488889004-hbfr4tilusce0bdr7nij6daq63a7rkdt.apps.googleusercontent.com',
        clientSecret:'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',
        callbackURL:'http://localhost:8000/users/auth/google/callback'
    },
    function(accessToken,refreshToken,profile,done){
        //find user
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){ console.log('Error in google strategy-passport',err); return }
            console.log(profile);
            //if user found set this user as req.user
            if(user){
                return done(null,user);
            }else{
                //if not found create the user and set it as req.user
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0],
                    password:crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){ console.log('Error in creating user google strategy-passport',err); return }
                    return done(null,user);
                });
            }
        });

    }
));

module.exports=passport;