module.exports.home = function(req,res){
    console.log(req.cookies);
    return res.render('codeial_home.ejs',{
        title:'Home'
    });
};