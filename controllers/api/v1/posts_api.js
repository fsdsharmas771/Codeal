const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index= async function(req,res){
    let posts = await Post.find({})
            .sort('-createdAt')// to sort the post as per the time it created means last post appears first
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });
    return res.json(200,{
        message:"List of Posts",
        posts:posts
    });
}
module.exports.destroy = async (req,res)=>{
    try{
        let post = await Post.findById(req.params.id,)
    // .id means converting the object id into string otherwise we use ._id
    if(post.user==req.user.id){
        post.remove();
        await Comment.deleteMany({post:req.params.id});
        return res.json(200,{
            message:'Post and associated comments are deleted'
        });
    }else{
        return res.json(401,{
            message:'You can not delete this post'
        })
    }
    }catch(err){
        return res.json(500,{
            message:'Internal Server Error'
        })
    }
}

