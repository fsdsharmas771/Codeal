const Comment = require('../models/comment');
const Post = require('../models/post');


module.exports.create = async (req,res)=>{
    try{
        let post = await Post.findById(req.body.post);
    if(post){
        let comment = await Comment.create({
            content:req.body.content,
            user:req.user._id,
            post:req.body.post
        })
        post.comments.push(comment);// first update
            post.save();// whenever we update something we have to call save to save the changes
            req.flash('success','Comment!!')
            res.redirect('back');
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        comment:comment
                    },
                    message:"Comment Created"
                });
            }
    }
    
    }catch(err){
        console.log('Error in creating post',err);
    }
    
}

module.exports.destroy = (req,res)=>{
    Comment.findById(req.params.id,(err,comment)=>{
        if(err){ console.log('Error in finding comment during deleting comment',err); return }
        if(comment.user == req.user.id){
            let postId = comment.post;// taking post id in variable to delete that comment from comments array of that post
            comment.remove();// remove the comment 
            // find the post to which deleted comment is related and pull/remove that comment id from comments array of that post
            Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},(err,post)=>{
                req.flash('success','Comment Deleted!!');
                return res.redirect('back');
            })
        }else{
            // if login user did not match comment user
            return res.redirect('back');
        }
    })
}