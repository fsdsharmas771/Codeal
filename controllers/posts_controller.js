module.exports.newpost = function(req,res){
    return res.render('newpost.ejs',{
        title:'New Post'
    });
}