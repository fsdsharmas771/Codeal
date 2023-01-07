const express = require('express');
const app = express();
const port = 8000;

// use express router
app.use('/',require('./routes/index'));

// setup view engin
app.set('view engin','ejs');
app.set('views','./views');

app.listen(port,function(error){
    if(error){
        console.log(`Error in running server: ${error}`);
    }
    console.log(`Yepp!! Server is running on port: ${port}`);
})