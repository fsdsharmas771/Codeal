const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = (req,res)=>{
    Post.create({
        content:req.body.content,
        user:req.user._id
    },(err)=>{
        if(err){ console.log('Error in create new post',err); return }
        return res.redirect('back');
    });
}

module.exports.destroy = (req,res)=>{
    Post.findById(req.params.id,(err,post)=>{
        if(err){console.log('Error in finding post during deleting',err); return}
        // .id means converting the object id into string otherwise we use ._id
        if(post.user==req.user.id){
            post.remove();
            Comment.deleteMany({post:req.params.id},(err)=>{
                if(err){console.log('Error in deleting comments while deleting post',err); return }
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    })
}