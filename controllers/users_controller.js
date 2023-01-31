const User = require('../models/user');
const Post = require('../models/post');

module.exports.profile = function(req,res){
    return res.render('profile.ejs',{
        title:`Profile`
    })
};
// render singup page
module.exports.signup = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('signup.ejs',{
        title:'Codeial-Sign Up'
    });
}
// render login page
module.exports.login = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('login.ejs',{
        title:'Codeial-Log In'
    });
}
// send singup page's form data to database 
module.exports.create= function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('Error in finding user during signing up',err); return }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){console.log('Error in creating user while singing up',err); return}
                return res.redirect('/users/login');
            });
        }else{
            res.redirect('back');
        }
    })
}
// module.exports.users_home = function(req,res){
//     Post.find({},function(err,posts){
//         if(err){ console.log('Error in fetching posts from DB',err); return}
//         return res.render('user_home.ejs',{
//             title:'Home',
//             post_list:posts
//         })
//     });
// }
module.exports.users_home = function(req,res){
    Post.find({}).populate('user').exec(function(err,posts){
        if(err){ console.log('Error in fetching posts from DB',err); return}
        return res.render('user_home.ejs',{
            title:'Home',
            post_list:posts
    });
})
}
// login and create session
module.exports.create_session=function(req,res){
    return res.redirect('/users/home');
}

// singout and destroy session
module.exports.destroy_session = function(req,res,next){
    req.logout(function(err){
        if(err){
            return next(err);
        }
    });
    return res.redirect('/');
}