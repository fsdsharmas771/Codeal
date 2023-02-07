const User = require('../models/user');
const Post = require('../models/post');
const { populate } = require('../models/comment');

module.exports.profile = function(req,res){
    User.findById(req.params.id,(err,user)=>{
        return res.render('profile.ejs',{
            title:'Profile',
            profile_user:user
        })
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
        return res.redirect('/users/home');
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
module.exports.users_home = async function(req,res){
    try{
        let posts = await Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    let users = await User.find({})
    return res.render('user_home.ejs',{
        title:'Home',
        post_list:posts,
        all_users:users});
    }catch(err){
        console.log('Error',err);
        return;
    }
}
// login and create session
module.exports.create_session=function(req,res){
    req.flash('success','Logged in Successfully!!');
    return res.redirect('/users/home');
}

// singout and destroy session
module.exports.destroy_session = function(req,res,next){
    // req.flash('success','Logged out Successfully!!');
    req.logout(function(err){
        if(err){
            return next(err);
        }
    });
    req.flash('success','Logged out Successfully!!');
    return res.redirect('/');
}
