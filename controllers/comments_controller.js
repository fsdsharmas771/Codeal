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

module.exports.destroy = (req,res)=>{
    Comment.findById(req.params.id,(err,comment)=>{
        if(err){ console.log('Error in finding comment during deleting comment',err); return }
        if(comment.user == req.user.id){
            let postId = comment.post;// taking post id in variable to delete that comment from comments array of that post
            comment.remove();// remove the comment 
            // find the post to which deleted comment is related and pull/remove that comment id from comments array of that post
            Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},(err,post)=>{
                return res.redirect('back');
            })
        }else{
            // if login user did not match comment user
            return res.redirect('back');
        }
    })
}