const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'xxxxxxxx@gmail.com', // generated ethereal user
      pass: 'xxxxxxxxxxxxxx', // generated ethereal password
    },
});

let renderTemplate = (data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){ console.log('Error in rendering template',err); return}
            mailHTML=template;
        }
    )
    return mailHTML;
}

module.exports ={ 
    transporter:transporter,
    renderTemplate:renderTemplate
}
