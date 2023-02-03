const Post = require('../models/post');

module.exports.create = (req,res)=>{
    Post.create({
        content:req.body.content,
        user:req.user._id
    },(err)=>{
        if(err){ console.log('Error in create new post',err); return }
        return res.redirect('back');
    });
}