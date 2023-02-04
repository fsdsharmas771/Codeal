const Comment = require('../models/comment');
const Post = require('../models/post');


module.exports.create = (req,res)=>{
    Post.findById(req.body.post,(err,post)=>{
        if(err){ console.log('Error in finding post while commenting',err); return}
        if(post){
            Comment.create({
                content:req.body.content,
                user:req.user._id,
                post:req.body.post
            },(err,comment)=>{
                if(err){ console.log('Error in create comment',err); return }
                
                post.comments.push(comment);// first update
                post.save();// whenever we update something we have to call save to save the changes
                res.redirect('back');
            });
        }
    });
}