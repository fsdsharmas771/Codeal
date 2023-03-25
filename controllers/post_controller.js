const Post = require('../models/post');
const Comment = require('../models/comment');
// const User = require('../models/user');

module.exports.create = async (req,res)=>{
    try{
        let post = await Post.create({
            content:req.body.content,
            user:req.user._id
        });
        post = await post.populate('user');
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post
                },
                message:"Post Created!!"
            });
        }
        req.flash('success','Post Published')
        return res.redirect('back');
    }catch(err){
        // console.log('Error in creating post while posting',err);
        req.flash('error',err);
    }
}

module.exports.destroy = async (req,res)=>{
    try{
        let post = await Post.findById(req.params.id,)
    // .id means converting the object id into string otherwise we use ._id
    if(post.user==req.user.id){
        post.remove();
        await Comment.deleteMany({post:req.params.id});
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post_id:req.params.id
                },
                message:'Post Deleted'
            })
        }
        req.flash('success','Post Deleted!!')
        return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        // console.log('Error while deleting post',err);
        req.flash('error',err);
    }
}
