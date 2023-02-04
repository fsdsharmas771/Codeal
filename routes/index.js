const express = require('express');
const router = express.Router();

// require that controaller 
const homeController = require('../controllers/home_contraoller');


router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));


module.exports = router;